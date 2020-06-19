const path = require('path');

const getAppDir = require('./getAppDir');

function resolvePath(relativePath) {
  return path.resolve(getAppDir(), relativePath);
}

module.exports = resolvePath;
