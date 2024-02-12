#!/usr/bin/env node
import path from 'path';
import * as fs from 'fs';

/**
 * find all files in a directory that match a pattern
 * @param dir target directory
 * @param pattern regex pattern to match
 * @returns
 */
export function findTestFiles(dir: string, pattern: RegExp): string[] {
  let results: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(findTestFiles(fullPath, pattern));
    } else if (pattern.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * KensaJs main function
 * @example
 * const kensa = Kensa();
 * kensa.title('Sample test');
 * @returns
 */
export default function Kensa() {
  let errors: any[] = [];
  function title(msg: string): void {
    console.log('📄', bold(msg));
  }
  function msg(msg: string): void {
    console.log(bold(msg));
  }
  function test({
    title,
    func,
    expect,
  }: {
    title: string;
    func: any;
    expect: any;
  }): void {
    errors = [];
    try {
      if (func !== expect) {
        console.log(
          bold(red('✗')),
          title,
          ` (result: ${red(String(func))}, expected: ${yellow(String(expect))})`
        );
      } else {
        console.log(bold(green('✓')), title);
      }
    } catch (e) {
      console.log(bold(red('✗')), title);
      errors.push(e);
    }
  }
  return {
    title,
    msg,
    test,
  };
}

function bold(msg: string): string {
  return `\x1b[1m${msg}\x1b[22m`;
}

function green(msg: string): string {
  return `\x1b[32m${msg}\x1b[39m`;
}

function red(msg: string): string {
  return `\x1b[31m${msg}\x1b[39m`;
}

function yellow(msg: string): string {
  return `\x1b[33m${msg}\x1b[39m`;
}

// main
// find all files that end with `.ks.ts` or `.ks.js` in the current directory
const basePath: string = process.argv[2]
  ? path.resolve(process.argv[2])
  : process.cwd();
console.log(`Searching for .ks.(ts|js) files in: ${basePath}`);
const testFiles: string[] = findTestFiles(basePath, /\.ks\.(ts|js)$/);
console.log(testFiles);

// execute all test files
(async () => {
  for (const file of testFiles) {
    try {
      console.log(`Importing test file: ${file}`);
      await import(file);
    } catch (error) {
      console.error(`Failed to import ${file}`, error);
    }
  }
})();
