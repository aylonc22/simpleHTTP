const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'test');

fs.readdirSync(testDir).forEach(file => {
  if (file.endsWith('.test.js')) {
    console.log(`🔎 Running: ${file}`);
    require(path.join(testDir, file));
  }
});
