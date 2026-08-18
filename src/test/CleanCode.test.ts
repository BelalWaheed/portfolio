import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Clean Code & Zero AI Cliché Enforcement', () => {
  const FORBIDDEN_STRINGS = [
    'Production Portfolio',
    'Initiate Collaboration',
    'Tech Stack & Capabilities',
    'Profile & Background',
  ];

  const getSourceFiles = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => !e.isDirectory() && /\.(tsx|ts)$/.test(e.name) && !e.name.includes('.test.'))
      .map((e) => path.join(dir, e.name));

    const folders = entries.filter((e) => e.isDirectory());
    for (const folder of folders) {
      files.push(...getSourceFiles(path.join(dir, folder.name)));
    }
    return files;
  };

  it('ensures none of the forbidden AI cliché strings exist in production source code', () => {
    const srcDir = path.resolve(__dirname, '..');
    const sourceFiles = getSourceFiles(srcDir);

    expect(sourceFiles.length).toBeGreaterThan(5);

    sourceFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      FORBIDDEN_STRINGS.forEach((forbidden) => {
        expect(
          content.includes(forbidden),
          `Found forbidden string "${forbidden}" in file: ${filePath}`
        ).toBe(false);
      });
    });
  });
});
