const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const clipId = "c3b31af8-e07d-4f27-b922-ec6375431d71";
const videoUrl = `https://y.yarn.co/${clipId}.mp4`;
const outputPath = path.join(__dirname, 'test_clip.mp4');

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
        
        console.log("Navigating directly to video URL:", videoUrl);
        await page.goto(videoUrl, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });
        
        console.log("Fetching video bytes inside browser context...");
        const base64Data = await page.evaluate(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch inside browser: ${response.status}`);
            }
            const buffer = await response.arrayBuffer();
            
            // Convert ArrayBuffer to base64 string
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }, videoUrl);
        
        console.log("Successfully fetched base64 data, length:", base64Data.length);
        
        const videoBuffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(outputPath, videoBuffer);
        console.log("Successfully saved file to:", outputPath);
        console.log("File size:", fs.statSync(outputPath).size);
        
        // Clean up
        fs.unlinkSync(outputPath);
        
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
