const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('../config/webpack.config');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

module.exports = (env) => {
  webpack(webpackConfig(env), (err, stats) => {
    if (err) {
      console.log(error('Failed to compile.'));
      console.log(error(err.stack || err));

      if (err.details) {
        console.log(error(err.details));
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.log(error('Failed to compile.'));
      console.log(error(info.errors));
    }

    if (stats.hasWarnings()) {
      console.log(warning('Compiled with warnings.\n'));
      console.log(warning(info.warnings));
    }
  });
};
