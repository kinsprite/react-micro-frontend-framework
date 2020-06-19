const git = require('git-rev-sync');

const getAppDir = require('./getAppDir');

function getGitTagOrShort() {
  const long = git.long(getAppDir());
  const tag = git.tag();

  if (tag.toLowerCase() === long.toLowerCase()) {
    // Generally, eight to ten characters are more than enough to be unique within a project.
    return { short: long.substr(0, 8) };
  }

  return { tag };
}

module.exports = getGitTagOrShort;
