const puppeteer = require('puppeteer-core');

async function run() {
    console.log("Launching Edge...");
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled'
            ]
        });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0");
        
        console.log("Navigating to getyarn.io search for 'hello'...");
        await page.goto('https://getyarn.io/yarn-find?text=hello', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        const results = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a[href*="/yarn-clip/"]'));
            
            // Map to group by UUID
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
                    // This is the movie link, text is usually: "Movie Title\n 1.2s"
                    const parts = text.split('\n');
                    groups[uuid].movie = parts[0].trim();
                    if (parts[1]) {
                        groups[uuid].duration = parts[1].trim();
                    }
                } else {
                    // This is the transcript link
                    groups[uuid].quote = text;
                }
            }
            
            return Object.values(groups);
        });
        
        console.log(`Found ${results.length} unique clips:`);
        console.log(JSON.stringify(results.slice(0, 10), null, 2));
        
    } catch (err) {
        console.error("Execution error:", err);
    } finally {
        if (browser) {
            console.log("Closing browser.");
            await browser.close();
        }
    }
}

run();
