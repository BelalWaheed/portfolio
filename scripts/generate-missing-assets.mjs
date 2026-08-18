import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = path.resolve('b:/projects/portfolio');
const vercelDir = path.resolve('b:/projects/portfolio/belalwaheed-vercel');
const publicDir = path.join(vercelDir, 'public');

async function processAvatar() {
  const profileJpg = path.join(publicDir, 'profile.jpg');
  if (fs.existsSync(profileJpg)) {
    console.log('Generating profile.webp and profile-m.webp...');
    await sharp(profileJpg)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(publicDir, 'profile.webp'));

    await sharp(profileJpg)
      .resize({ width: 360, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(publicDir, 'profile-m.webp'));
    console.log('Avatar images generated successfully.');
  }
}

async function processLoopImages() {
  const loopImgsDir = path.join(rootDir, 'projects-imags', 'loop');
  const loopPublicDir = path.join(publicDir, 'projects', 'loop');

  if (!fs.existsSync(loopPublicDir)) {
    fs.mkdirSync(loopPublicDir, { recursive: true });
  }

  // 1.webp
  const s1 = path.join(loopImgsDir, 'Screenshot_1.png');
  if (fs.existsSync(s1)) {
    console.log('Generating loop/1.webp and loop/1-m.webp...');
    await sharp(s1)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(loopPublicDir, '1.webp'));

    await sharp(s1)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(loopPublicDir, '1-m.webp'));
  }

  // 2.webp & 2-m.webp
  const s2 = path.join(loopImgsDir, 'Screenshot_2.png');
  if (fs.existsSync(s2)) {
    console.log('Generating loop/2.webp and loop/2-m.webp...');
    await sharp(s2)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(loopPublicDir, '2.webp'));

    await sharp(s2)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(loopPublicDir, '2-m.webp'));
  }

  // 3.webp & 3-m.webp
  const s6 = path.join(loopImgsDir, 'Screenshot_6.png');
  if (fs.existsSync(s6)) {
    console.log('Generating loop/3.webp and loop/3-m.webp...');
    await sharp(s6)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(loopPublicDir, '3.webp'));

    await sharp(s6)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(loopPublicDir, '3-m.webp'));
  }
}

async function auditAllProjects() {
  const projects = ['tivaq', 'moviq', 'loop', 'obel'];
  for (const p of projects) {
    const pDir = path.join(publicDir, 'projects', p);
    if (!fs.existsSync(pDir)) continue;
    const files = fs.readdirSync(pDir);
    console.log(`[Project: ${p}] Files:`, files.filter(f => f.endsWith('.webp') || f.endsWith('.mp4') || f.endsWith('.webm')));
  }
}

async function main() {
  try {
    await processAvatar();
    await processLoopImages();
    await auditAllProjects();
    console.log('All image optimization tasks completed successfully.');
  } catch (err) {
    console.error('Error generating assets:', err);
    process.exit(1);
  }
}

main();
