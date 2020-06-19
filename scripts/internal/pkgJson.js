const camelCase = require('camelcase');
const resolvePath = require('./resolvePath');

function getPkgJson() {
  return require(resolvePath('package.json'));
}

function getMicroserviceFolderName() {
  const pkgJson = getPkgJson();
  const names = `${pkgJson.name}`.replace('react-microservice', 'rms').split('/');
  const lastName = names[names.length - 1];
  return lastName.toLocaleLowerCase();
}

function getLibraryName() {
  return camelCase(getMicroserviceFolderName());
}

module.exports = {
  getPkgJson,
  getMicroserviceFolderName,
  getLibraryName,
};
