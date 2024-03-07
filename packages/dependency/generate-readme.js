const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const packagesDir = path.join(__dirname);
const packages = fs.readdirSync(packagesDir).filter(entry => fs.lstatSync(path.join(packagesDir, entry)).isDirectory());


const templateFile = path.join(__dirname, 'README.tpl.md');
const templateContent = fs.readFileSync(templateFile, 'utf8');
const template = handlebars.compile(templateContent);

packages.forEach(packageName => {
  const packageDir = path.join(packagesDir, packageName);
  const packageJson = require(path.join(packageDir, 'package.json'));

  const readme = template({
    // name: packageJson.name,
    // description: packageJson.description,
    // license: packageJson.license,
    // licenseUrl: packageJson.licenseUrl || `https://opensource.org/licenses/${packageJson.license}`
  });

  fs.writeFileSync(path.join(packageDir, 'README.md'), readme);
});