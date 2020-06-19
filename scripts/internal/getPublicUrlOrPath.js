const git = require('git-rev-sync');
const paramCase = require('param-case');

const pkgJson = require('./pkgJson');
const getAppDir = require('./getAppDir');

function gitTagOrSHA() {
  const long = git.long(getAppDir());
  const tag = git.tag();

  if (tag.toLowerCase() === long.toLowerCase()) {
    // Generally, eight to ten characters are more than enough to be unique within a project.
    return long.substr(0, 8);
  }

  return paramCase(tag);
}

function getPublicUrlOrPath(isEnvDevelopment) {
  if (isEnvDevelopment) {
    return undefined;
  }

  let publicRootURL = process.env.PUBLIC_ROOT_URL || '';

  // ensure last slash exists
  if (publicRootURL) {
    publicRootURL = publicRootURL.endsWith('/') ? publicRootURL : `${publicRootURL}/`;
  }

  const folderName = pkgJson.getMicroserviceFolderName();
  // must add the end '/'
  return `${publicRootURL}${folderName}/${gitTagOrSHA()}/`;
}

module.exports = getPublicUrlOrPath;
