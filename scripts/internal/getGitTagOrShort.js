const git = require('git-rev-sync');

const getAppDir = require('./getAppDir');

function getGitTagOrShort() {
  if (git.isTagDirty()) {
    const long = git.long(getAppDir());
    // Generally, eight to ten characters are more than enough to be unique within a project.
    return { short: long.substr(0, 8) };
  }

  const tag = git.tag();
  return { tag };
}

module.exports = getGitTagOrShort;
