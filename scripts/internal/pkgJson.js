const camelCase = require('camelcase');
const { paramCase } = require('param-case');

const resolvePath = require('./resolvePath');

function getPkgJson() {
  return require(resolvePath('package.json'));
}

function getMicroserviceFolderName() {
  const pkgJson = getPkgJson();
  const names = `${pkgJson.name}`.replace('react-microservice', 'rms').split('/');
  const lastName = names[names.length - 1];
  return paramCase(lastName);
}

function getLibraryName() {
  return camelCase(getMicroserviceFolderName());
}

function getMainEntryName() {
  const pkgJson = getPkgJson();
  const names = `${pkgJson.name}`.replace('react-microservice', '').split('/');
  const lastName = names[names.length - 1];
  return paramCase(lastName);
}

function getRoutes() {
  const pkgJson = getPkgJson();
  return (Array.isArray(pkgJson.routes) && pkgJson.routes) || [];
}

module.exports = {
  getPkgJson,
  getMicroserviceFolderName,
  getLibraryName,
  getMainEntryName,
  getRoutes,
};
