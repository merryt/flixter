const { downloadClip, getBrowserPath, puppeteer } = require('./download_yarn');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const JSON_OUTPUT_PATH = path.join(__dirname, 'downloaded_clips.json');

// Dynamically load quotes.js to avoid ESM syntax error with require
function loadQuotes() {
    const fileContent = fs.readFileSync('./quotes.js', 'utf8');
    const cleanContent = fileContent.replace('export default movieQuotes;', '// export default movieQuotes;');
    
    const sandbox = { module: { exports: {} }, exports: {} };
    vm.createContext(sandbox);
    vm.runInContext(cleanContent, sandbox);
    
    return sandbox.exports.movieQuotes || sandbox.module.exports || sandbox.movieQuotes;
}

// Load existing downloads if the JSON file exists
function loadExistingResults() {
    if (fs.existsSync(JSON_OUTPUT_PATH)) {
        try {
            return JSON.parse(fs.readFileSync(JSON_OUTPUT_PATH, 'utf8'));
        } catch (e) {
            console.error("Failed to parse existing JSON output, starting fresh:", e.message);
        }
    }
    return [];
}

// Save results to JSON file
function saveResults(results) {
    fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(results, null, 2), 'utf8');
}

async function run() {
    let movieQuotes;
    try {
        movieQuotes = loadQuotes();
    } catch (e) {
        console.error("Failed to load quotes.js:", e.message);
        process.exit(1);
    }
    
    const existingResults = loadExistingResults();
    console.log(`Loaded ${movieQuotes.length} total quotes from quotes.js.`);
    console.log(`Loaded ${existingResults.length} existing downloads from downloaded_clips.json.`);
    
    // We want to process from index 10 to 99 (numbers 11 to 100)
    const targetQuotes = movieQuotes.slice(10, 100);
    console.log(`Preparing to process ${targetQuotes.length} quotes (#11 through #100).`);
    
    console.log(`Launching single browser instance for batch download...`);
    let browser;
    try {
        const browserPath = getBrowserPath();
        browser = await puppeteer.launch({
            executablePath: browserPath,
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled'
            ]
        });
    } catch (err) {
        console.error("Failed to launch Puppeteer browser:", err.message);
        process.exit(1);
    }

    const currentResults = [...existingResults];

    for (let i = 0; i < targetQuotes.length; i++) {
        const item = targetQuotes[i];
        
        // Skip if this quote number has already been successfully downloaded (excluding 'NA')
        const alreadyDownloaded = existingResults.find(r => r.number === item.number && r.clipPath !== 'NA');
        if (alreadyDownloaded) {
            console.log(`Quote #${item.number} already downloaded: ${alreadyDownloaded.clipPath}. Skipping.`);
            continue;
        }

        console.log(`\n========================================`);
        console.log(`Progress: ${i + 1} / ${targetQuotes.length}`);
        console.log(`Quote #${item.number}`);
        console.log(`Movie: ${item.movie}`);
        console.log(`Quote: "${item.quote}"`);
        
        try {
            const clipPath = await downloadClip(item.movie, item.quote, browser);
            
            // Remove previous entry for this quote if it exists (e.g. if it was NA earlier)
            const existIndex = currentResults.findIndex(r => r.number === item.number);
            const entry = {
                number: item.number,
                movie: item.movie,
                year: item.year,
                quote: item.quote,
                clipPath: clipPath
            };
            
            if (existIndex > -1) {
                currentResults[existIndex] = entry;
            } else {
                currentResults.push(entry);
            }
            
            // Save state progressively
            saveResults(currentResults);
        } catch (err) {
            console.error(`Error processing quote #${item.number}:`, err.message);
            const existIndex = currentResults.findIndex(r => r.number === item.number);
            const entry = {
                number: item.number,
                movie: item.movie,
                year: item.year,
                quote: item.quote,
                clipPath: "NA"
            };
            
            if (existIndex > -1) {
                currentResults[existIndex] = entry;
            } else {
                currentResults.push(entry);
            }
            saveResults(currentResults);
        }
        
        // Pace requests to avoid trigger blocks
        if (i < targetQuotes.length - 1) {
            const delay = 1000 + Math.random() * 1500;
            console.log(`Sleeping for ${(delay / 1000).toFixed(1)}s to pace requests...`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    
    if (browser) {
        console.log("\nClosing browser...");
        await browser.close();
    }
    
    console.log(`\n========================================`);
    console.log(`FINISHED PROCESSING ALL CLIPS`);
    console.log(`Progress saved to: ${JSON_OUTPUT_PATH}`);
    console.log(`========================================\n`);
}

run();
