import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 現在のファイルのディレクトリを取得
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 元となるpackage.jsonのパス
const originalPackageJsonPath = path.resolve(__dirname, './package.json');
// 新しいpackage.jsonを出力するパス
const newPackageJsonPath = path.resolve(__dirname, './dist/package.json');

// package.jsonを非同期で読み込む
fs.readFile(originalPackageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the original package.json:', err);
    return;
  }

  const packageJson = JSON.parse(data);

  // 除外したいフィールド
  const fieldsToRemove = ['devDependencies', 'scripts', 'jest'];

  // 除外するフィールドを削除
  fieldsToRemove.forEach(field => {
    delete packageJson[field];
  });

  // 新しいpackage.jsonをdistディレクトリに書き込む
  fs.writeFile(newPackageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
    if (err) {
      console.error('Error writing new package.json:', err);
      return;
    }
    console.log('New package.json has been prepared.');
  });
});
