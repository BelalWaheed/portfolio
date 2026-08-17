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

async function extractFromLoopDemo() {
  const bravePath = getBraveExecutable();
  const videoPath = path.resolve(__dirname, '../public/projects/loop/loop-demo.mp4').replace(/\\/g, '/');
  const outputDir = path.resolve(__dirname, '../public/projects/loop');

  const browser = await puppeteer.launch({
    executablePath: bravePath,
    headless: true,
    args: ['--no-sandbox', '--allow-file-access-from-files', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000; overflow:hidden; display:flex; align-items:center; justify-content:center; width:100vw; height:100vh;">
        <video id="vid" src="file:///${videoPath}" style="width:100%; height:100%; object-fit:contain;" muted></video>
      </body>
    </html>
  `;

  await page.setContent(html);

  // Get video duration
  const duration = await page.evaluate(() => {
    const vid = document.getElementById('vid');
    return new Promise((resolve) => {
      vid.onloadedmetadata = () => resolve(vid.duration);
      if (vid.duration) resolve(vid.duration);
    });
  });

  console.log(`Loop demo duration: ${duration}s`);

  const t1 = Math.min(1.0, duration * 0.1);
  const t2 = duration * 0.45;
  const t3 = duration * 0.85;

  const snaps = [
    { time: t1, name: '1.png' },
    { time: t2, name: '2.png' },
    { time: t3, name: '3.png' },
  ];

  for (const snap of snaps) {
    console.log(`Extracting frame at ${snap.time.toFixed(1)}s -> ${snap.name}...`);
    await page.evaluate((time) => {
      const vid = document.getElementById('vid');
      return new Promise((resolve) => {
        vid.currentTime = time;
        vid.onseeked = () => resolve();
      });
    }, snap.time);

    await new Promise((r) => setTimeout(r, 800));

    const outPath = path.join(outputDir, snap.name);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  console.log('Loop demo frames extracted successfully!');
}

extractFromLoopDemo().catch(console.error);
