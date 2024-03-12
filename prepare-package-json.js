const fs = require('fs');
const path = require('path');

const originalPackageJsonPath = path.resolve(__dirname, './package.json');
const newPackageJsonPath = path.resolve(__dirname, './dist/package.json');

fs.readFile(originalPackageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the original package.json:', err);
    return;
  }
  const packageJson = JSON.parse(data);
  const fieldsToRemove = ['devDependencies', 'scripts', 'jest'];
  fieldsToRemove.forEach((field) => {
    delete packageJson[field];
  });
  fs.writeFile(
    newPackageJsonPath,
    JSON.stringify(packageJson, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing new package.json:', err);
        return;
      }
      console.log('New package.json has been prepared.');
    }
  );
});
