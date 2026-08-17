import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRAVE_PATHS = [
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  `${process.env.LOCALAPPDATA}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
];

function getBraveExecutable() {
  for (const p of BRAVE_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Brave browser executable not found.');
}

async function extractVideoFrames() {
  const bravePath = getBraveExecutable();
  const videoPath = path.resolve(__dirname, '../../presentation/loop-project-intreduce.mp4').replace(/\\/g, '/');
  const outputDir = path.resolve(__dirname, '../public/projects/loop');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: bravePath,
    headless: true,
    args: ['--no-sandbox', '--allow-file-access-from-files', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 3 });

  // HTML page with high-res video player
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000; overflow:hidden; display:flex; align-items:center; justify-content:center; width:100vw; height:100vh;">
        <video id="vid" src="file:///${videoPath}" style="width:100%; height:100%; object-fit:contain;" muted></video>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);

  // Timestamps to capture key features from the presentation video
  const timestamps = [
    { time: 2.0, name: '1.png' },   // Hero feed
    { time: 8.5, name: '2.png' },   // Interactive posts / details
    { time: 18.0, name: '3.png' },  // Features / workflow
  ];

  for (const item of timestamps) {
    console.log(`Extracting frame at ${item.time}s for ${item.name}...`);
    await page.evaluate((t) => {
      const vid = document.getElementById('vid');
      return new Promise((resolve) => {
        vid.currentTime = t;
        vid.onseeked = () => resolve();
      });
    }, item.time);

    await new Promise((r) => setTimeout(r, 600));

    const outPath = path.join(outputDir, item.name);
    await page.screenshot({ path: outPath });
    console.log(`Saved high-res frame: ${outPath}`);
  }

  await browser.close();
  console.log('Loop high-res video frames generated successfully!');
}

extractVideoFrames().catch(console.error);
