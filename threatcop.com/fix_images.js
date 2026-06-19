const fs = require('fs');
const https = require('https');
const path = require('path');
const url = require('url');

const htmlPath = path.join(__dirname, 'index.html');
const imgsDir = path.join(__dirname, 'imgs');

if (!fs.existsSync(imgsDir)) {
    fs.mkdirSync(imgsDir, { recursive: true });
}

let html = fs.readFileSync(htmlPath, 'utf8');

// Regex to find Next.js image URLs in the HTML
// e.g. /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhow-does-threatcop.0c49a1df.webp&w=3840&q=75
// They can be encoded or partially encoded.
// Let's find all instances of https://threatcop.com/_next/image?... and /_next/image?...
const regex = /(\/|https:\/\/threatcop\.com\/)_next\/image\?url=([^&"'\s]+)(?:&amp;|&)[^"'\s]*/g;
const matches = [...html.matchAll(regex)];

let downloadCount = 0;
let replaceCount = 0;

async function downloadImage(imgUrl, filename) {
    return new Promise((resolve, reject) => {
        const dest = path.join(imgsDir, filename);
        if (fs.existsSync(dest)) {
            resolve();
            return;
        }
        
        const file = fs.createWriteStream(dest);
        https.get(imgUrl, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                file.close();
                fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err.message);
        });
    });
}

async function processImages() {
    const processedUrls = new Set();

    for (const match of matches) {
        const fullMatch = match[0]; // e.g. /_next/image?url=...
        const encodedUrlParam = match[2]; // e.g. %2F_next%2Fstatic...
        
        let decodedUrlParam = decodeURIComponent(encodedUrlParam);
        
        // Sometimes it's doubly encoded in HTML like %252F
        if (decodedUrlParam.includes('%2F')) {
            decodedUrlParam = decodeURIComponent(decodedUrlParam);
        }

        // The filename is the last part of the decoded URL path
        const filename = path.basename(decodedUrlParam);
        
        if (!processedUrls.has(fullMatch)) {
            processedUrls.add(fullMatch);
            
            // Reconstruct full URL to download from
            let downloadUrl = fullMatch;
            if (downloadUrl.startsWith('/')) {
                downloadUrl = 'https://threatcop.com' + downloadUrl;
            }
            // fix encoded amp; if present
            downloadUrl = downloadUrl.replace(/&amp;/g, '&');

            console.log(`Downloading: ${filename}`);
            try {
                await downloadImage(downloadUrl, filename);
                downloadCount++;
            } catch (err) {
                console.error(`Failed to download ${downloadUrl}: ${err}`);
            }
        }

        // Replace in HTML
        html = html.replace(fullMatch, `imgs/${filename}`);
        replaceCount++;
    }

    if (replaceCount > 0) {
        fs.writeFileSync(htmlPath, html, 'utf8');
        console.log(`\nSuccessfully downloaded ${downloadCount} images and updated ${replaceCount} references in index.html.`);
    } else {
        console.log("No Next.js images found to process.");
    }
}

processImages();
