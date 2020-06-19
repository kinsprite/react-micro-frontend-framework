const { paramCase } = require('param-case');

const pkgJson = require('./pkgJson');
const getGitTagOrShort = require('./getGitTagOrShort');

function getRevisionPath() {
  const gitRev = getGitTagOrShort();

  if (gitRev.tag) {
    return paramCase(gitRev.tag, { stripRegexp: /[^A-Z0-9\\.]/gi });
  }

  return gitRev.short;
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
  return `${publicRootURL}${folderName}/${getRevisionPath()}/`;
}

module.exports = getPublicUrlOrPath;
