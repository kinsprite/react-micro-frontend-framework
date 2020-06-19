const fs = require('fs');

function getAppDir() {
  return fs.realpathSync(process.cwd());
}

module.exports = getAppDir;
