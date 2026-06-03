const { downloadClip, getBrowserPath, puppeteer } = require('./download_yarn');
const fs = require('fs');
const vm = require('vm');

// Dynamically load quotes.js to avoid ESM syntax error with require
function loadQuotes() {
    const fileContent = fs.readFileSync('./quotes.js', 'utf8');
    const cleanContent = fileContent.replace('export default movieQuotes;', '// export default movieQuotes;');
    
    const sandbox = { module: { exports: {} }, exports: {} };
    vm.createContext(sandbox);
    vm.runInContext(cleanContent, sandbox);
    
    return sandbox.exports.movieQuotes || sandbox.module.exports || sandbox.movieQuotes;
}

async function run() {
    let movieQuotes;
    try {
        movieQuotes = loadQuotes();
    } catch (e) {
        console.error("Failed to load quotes.js:", e.message);
        process.exit(1);
    }
    
    const first10 = movieQuotes.slice(0, 10);
    const results = [];
    
    console.log(`Loaded ${movieQuotes.length} quotes from quotes.js.`);
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

    console.log(`Processing the first 10 quotes...\n`);
    
    for (let i = 0; i < first10.length; i++) {
        const item = first10[i];
        console.log(`\n========================================`);
        console.log(`Progress: ${i + 1} / 10`);
        console.log(`Quote #${item.number}`);
        console.log(`Movie: ${item.movie}`);
        console.log(`Quote: "${item.quote}"`);
        
        try {
            // Pass the active browser instance to reuse it
            const clipPath = await downloadClip(item.movie, item.quote, browser);
            results.push({
                number: item.number,
                movie: item.movie,
                year: item.year,
                quote: item.quote,
                clipPath: clipPath
            });
        } catch (err) {
            console.error(`Error processing quote #${item.number}:`, err.message);
            results.push({
                number: item.number,
                movie: item.movie,
                year: item.year,
                quote: item.quote,
                clipPath: "NA"
            });
        }
        
        // Add a tiny random delay between requests (1-2 seconds) to mimic human browsing behavior
        if (i < first10.length - 1) {
            const delay = 1000 + Math.random() * 1000;
            console.log(`Sleeping for ${(delay / 1000).toFixed(1)}s to pace requests...`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    
    // Close the browser at the very end
    if (browser) {
        console.log("\nClosing browser...");
        await browser.close();
    }
    
    console.log(`\n========================================`);
    console.log(`FINISHED PROCESSING FIRST 10 CLIPS`);
    console.log(`========================================\n`);
    
    console.table(results.map(r => ({
        Number: r.number,
        Movie: r.movie,
        Year: r.year,
        Quote: r.quote.length > 40 ? r.quote.substring(0, 37) + '...' : r.quote,
        ClipPath: r.clipPath
    })));
}

run();
