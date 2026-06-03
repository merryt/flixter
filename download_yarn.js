const { addExtra } = require('puppeteer-extra');
const puppeteerCore = require('puppeteer-core');
const puppeteer = addExtra(puppeteerCore);
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Apply stealth plugin
puppeteer.use(StealthPlugin());

// Helper to find an installed Chromium browser on Windows
function getBrowserPath() {
    const paths = [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    for (const p of paths) {
        if (fs.existsSync(p)) {
            return p;
        }
    }
    throw new Error(
        "Could not find Microsoft Edge or Google Chrome at standard Windows paths.\n" +
        "Please ensure a Chromium-based browser is installed."
    );
}

// Helper to sanitize filenames for Windows filesystem
function sanitizeFilename(name) {
    return name.replace(/[/\\:*?"<>|]/g, '').trim();
}

// Helper to clean search queries (strip punctuation for better search results on Yarn)
function cleanSearchQuery(query) {
    return query
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"]/g, "") // Remove most punctuation, keep apostrophes
        .replace(/\s+/g, " ")                           // Normalize whitespace
        .trim();
}

/**
 * Searches getyarn.io and downloads the first response.
 * @param {string} movieTitle - Movie title to filter by (optional)
 * @param {string} quoteText - The quote text to search for
 * @param {object} [existingBrowser] - Optional existing Puppeteer browser instance to reuse
 * @returns {Promise<string>} - The relative path of the downloaded clip, or "NA" if not found/error.
 */
async function downloadClip(movieTitle, quoteText, existingBrowser = null) {
    let browserPath;
    try {
        browserPath = getBrowserPath();
    } catch (e) {
        console.error(e.message);
        return "NA";
    }

    let browser = existingBrowser;
    const shouldCloseBrowser = !existingBrowser;

    try {
        if (!browser) {
            browser = await puppeteer.launch({
                executablePath: browserPath,
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-blink-features=AutomationControlled'
                ]
            });
        }

        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0");

        // --- Dual Search Strategy ---
        // 1. Try raw original query first
        let searchQuery = quoteText;
        console.log(`\n--- Starting Download ---`);
        console.log(`Searching Yarn for raw quote: "${searchQuery}"`);
        if (movieTitle) console.log(`Movie Filter: "${movieTitle}"`);

        let searchUrl = `https://getyarn.io/yarn-find?text=${encodeURIComponent(searchQuery)}`;
        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

        let clips = await parseClips(page);

        // 2. If no results, try cleaned query (strip punctuation)
        if (clips.length === 0) {
            const cleanedQuery = cleanSearchQuery(quoteText);
            if (cleanedQuery !== searchQuery) {
                searchQuery = cleanedQuery;
                console.log(`No results for raw quote. Trying cleaned query: "${searchQuery}"`);
                searchUrl = `https://getyarn.io/yarn-find?text=${encodeURIComponent(searchQuery)}`;
                await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
                clips = await parseClips(page);
            }
        }

        if (clips.length === 0) {
            console.log("No clips found on getyarn.io for this quote.");
            await page.close();
            return "NA";
        }

        // Filter by movie title if provided
        let selectedClip = null;
        if (movieTitle) {
            const targetMovieLower = movieTitle.toLowerCase();
            selectedClip = clips.find(c => c.movie.toLowerCase().includes(targetMovieLower));
            
            if (selectedClip) {
                console.log(`Found matching clip for movie "${selectedClip.movie}": "${selectedClip.quote}"`);
            } else {
                console.log(`No clips matched the movie title "${movieTitle}".`);
                selectedClip = clips[0];
                console.log(`Falling back to the first search response: "${selectedClip.quote}" from "${selectedClip.movie}"`);
            }
        } else {
            selectedClip = clips[0];
            console.log(`Selected first response: "${selectedClip.quote}" from "${selectedClip.movie}"`);
        }

        const videoUrl = `https://y.yarn.co/${selectedClip.uuid}.mp4`;
        
        // Navigate to the CDN domain root first to set same-origin context
        console.log(`Navigating browser to CDN root to bypass CORS...`);
        await page.goto("https://y.yarn.co/", {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        console.log(`Downloading video bytes via same-origin fetch...`);
        const base64Data = await page.evaluate(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch inside browser: ${response.status}`);
            }
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    const base64 = base64String.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        }, videoUrl);

        // Ensure "clips" folder exists
        const clipsDir = path.join(process.cwd(), 'clips');
        if (!fs.existsSync(clipsDir)) {
            fs.mkdirSync(clipsDir, { recursive: true });
        }

        // Build file name: "Movie - QuoteSnippet - uuid.mp4"
        const cleanMovie = sanitizeFilename(selectedClip.movie || "Unknown Movie");
        const cleanQuote = sanitizeFilename(selectedClip.quote || "Quote").substring(0, 45);
        const fileName = `${cleanMovie} - ${cleanQuote} - ${selectedClip.uuid}.mp4`;
        const outputPath = path.join(clipsDir, fileName);
        const relativeOutputPath = path.join('clips', fileName);

        fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
        
        console.log(`Success! Saved to ${relativeOutputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
        await page.close();
        return relativeOutputPath;

    } catch (err) {
        console.error("An error occurred during download:", err.message);
        return "NA";
    } finally {
        if (browser && shouldCloseBrowser) {
            await browser.close();
        }
    }
}

// Helper to extract links from current search page
async function parseClips(page) {
    return await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href*="/yarn-clip/"]'));
        const groups = {};
        
        for (const a of anchors) {
            const href = a.href;
            const match = href.match(/\/yarn-clip\/([a-f0-9\-]+)/i);
            if (!match) continue;
            
            const uuid = match[1];
            if (!groups[uuid]) {
                groups[uuid] = {
                    uuid,
                    url: href,
                    movie: '',
                    duration: '',
                    quote: ''
                };
            }
            
            const text = a.innerText.trim();
            if (a.classList.contains('p')) {
                const parts = text.split('\n');
                groups[uuid].movie = parts[0].trim();
                if (parts[1]) {
                    groups[uuid].duration = parts[1].trim();
                }
            } else {
                groups[uuid].quote = text;
            }
        }
        return Object.values(groups);
    });
}

// Command Line execution support
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log("Usage:");
        console.log("  node download_yarn.js \"<movie_title>\" \"<quote>\"");
        console.log("  node download_yarn.js \"<quote>\" (downloads first result)");
        process.exit(0);
    }

    let movie = null;
    let quote = null;

    if (args.length === 1) {
        quote = args[0];
    } else {
        movie = args[0];
        quote = args[1];
    }

    downloadClip(movie, quote).then(result => {
        console.log(`Result: ${result}`);
    });
}

module.exports = { downloadClip, getBrowserPath, puppeteer };
