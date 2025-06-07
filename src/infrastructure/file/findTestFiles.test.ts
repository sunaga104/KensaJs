import * as fs from 'fs';
import * as path from 'path';
import { findTestFiles } from './findTestFiles';

describe('findTestFiles', () => {
  const tempDir = fs.mkdtempSync(path.join(fs.mkdtempSync('/tmp/ftf'), 'dir'));
  beforeAll(() => {
    fs.mkdirSync(path.join(tempDir, 'sub'));
    fs.writeFileSync(path.join(tempDir, 'a.ks.ts'), '');
    fs.writeFileSync(path.join(tempDir, 'b.txt'), '');
    fs.writeFileSync(path.join(tempDir, 'sub', 'c.ks.ts'), '');
  });
  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });
  test('finds files matching pattern recursively', () => {
    const files = findTestFiles(tempDir, /\.ks\.ts$/);
    expect(files.sort()).toEqual([
      path.join(tempDir, 'a.ks.ts'),
      path.join(tempDir, 'sub', 'c.ks.ts'),
    ].sort());
  });
});
