const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const packagesDir = path.join(__dirname);
const packages = fs.readdirSync(packagesDir).filter(entry => fs.lstatSync(path.join(packagesDir, entry)).isDirectory());


const templateFile = path.join(__dirname, 'README.tpl.md');
const templateContent = fs.readFileSync(templateFile, 'utf8');
const template = handlebars.compile(templateContent);

handlebars.registerPartial('usageSlot', '');
handlebars.registerPartial('extraSlots', '');

packages.forEach(packageName => {
  const packageDir = path.join(packagesDir, packageName);
  // const packageJson = require(path.join(packageDir, 'package.json'));

  const hasUsageSlot = fs.existsSync(path.join(packageDir, 'usage-slot.md'));
  const hasExtraSlots = fs.existsSync(path.join(packageDir, 'extra-slots.md'));

  const usageSlot = hasUsageSlot ? fs.readFileSync(path.join(packageDir, 'usage-slot.md'), 'utf8') : '';
  const extraSlots = hasExtraSlots ? fs.readFileSync(path.join(packageDir, 'extra-slots.md'), 'utf8') : '';

  handlebars.registerPartial('usageSlot', usageSlot);
  handlebars.registerPartial('extraSlots', extraSlots);

  const readme = template({
    hasUsageSlot,
    hasExtraSlots
    // name: packageJson.name,
    // description: packageJson.description,
    // license: packageJson.license,
    // licenseUrl: packageJson.licenseUrl || `https://opensource.org/licenses/${packageJson.license}`
  });

  fs.writeFileSync(path.join(packageDir, 'README.md'), readme);
});