import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard Brave Browser installation paths on Windows
const BRAVE_PATHS = [
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  `${process.env.LOCALAPPDATA}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`,
];

function getBraveExecutable() {
  for (const p of BRAVE_PATHS) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  throw new Error(`Brave browser executable not found. Checked paths: \n${BRAVE_PATHS.join('\n')}`);
}

async function capture() {
  const bravePath = getBraveExecutable();
  console.log(`Using Brave executable: ${bravePath}`);

  const browser = await puppeteer.launch({
    executablePath: bravePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080'],
  });

  const outputBase = path.resolve(__dirname, '../public/projects');

  const targets = [
    {
      id: 'tivaq',
      url: 'https://www.tivaqfragrance.com/',
      views: [
        { name: '1.png', width: 1440, height: 900, dpr: 3, fullPage: false },
        { name: '2.png', width: 1440, height: 900, dpr: 3, scrollY: 600 },
        { name: '3.png', width: 390, height: 844, dpr: 3, isMobile: true },
      ],
    },
    {
      id: 'moviqq',
      url: 'https://moviqq.vercel.app',
      views: [
        { name: '1.png', width: 1440, height: 900, dpr: 3, fullPage: false },
        { name: '2.png', width: 1440, height: 900, dpr: 3, scrollY: 500 },
        { name: '3.png', width: 390, height: 844, dpr: 3, isMobile: true },
      ],
    },
    {
      id: 'obel',
      url: 'https://obel.vercel.app',
      views: [
        { name: '1.png', width: 1440, height: 900, dpr: 3, fullPage: false },
        { name: '2.png', width: 1440, height: 900, dpr: 3, scrollY: 400 },
        { name: '3.png', width: 390, height: 844, dpr: 3, isMobile: true },
      ],
    },
  ];

  for (const target of targets) {
    const projectDir = path.join(outputBase, target.id);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    const page = await browser.newPage();

    for (const view of target.views) {
      console.log(`Capturing ${target.id} -> ${view.name} (Scale: ${view.dpr}x)...`);
      await page.setViewport({
        width: view.width,
        height: view.height,
        deviceScaleFactor: view.dpr,
        isMobile: !!view.isMobile,
      });

      try {
        await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 35000 });
        await new Promise((r) => setTimeout(r, 2500)); // allow fonts, webgl, and animations to settle

        if (view.scrollY) {
          await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), view.scrollY);
          await new Promise((r) => setTimeout(r, 1200));
        }

        const outPath = path.join(projectDir, view.name);
        await page.screenshot({
          path: outPath,
          fullPage: !!view.fullPage,
        });
        console.log(`Saved: ${outPath}`);
      } catch (err) {
        console.error(`Error capturing ${target.id} (${view.name}):`, err.message);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('All 3x High-DPI captures completed successfully using Brave browser!');
}

capture().catch((e) => {
  console.error('Capture failed:', e);
  process.exit(1);
});
