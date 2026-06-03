const fs = require('fs');
const path = require('path');

const clipId = "c3b31af8-e07d-4f27-b922-ec6375431d71";
const videoUrl = `https://y.yarn.co/${clipId}.mp4`;
const outputPath = path.join(__dirname, 'test_clip.mp4');

async function run() {
    console.log("Downloading clip from:", videoUrl);
    try {
        const res = await fetch(videoUrl);
        console.log("Status:", res.status);
        console.log("Headers:", Object.fromEntries(res.headers.entries()));
        
        if (res.ok) {
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(outputPath, Buffer.from(buffer));
            console.log("Successfully saved file to:", outputPath);
            console.log("File size:", fs.statSync(outputPath).size);
            // clean up
            fs.unlinkSync(outputPath);
        } else {
            console.error("Failed to download clip, status:", res.status);
        }
    } catch (e) {
        console.error("Download error:", e);
    }
}

run();
