const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const resolvePath = require('./resolvePath');
const getPublicUrlOrPath = require('./getPublicUrlOrPath');

const webpackConfig = require('../config/webpack.config');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

function webpackCallback(err, stats) {
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
}

/**
 * run webpack
 * @param {string} env 'development' or 'production'
 * @param {Function=} onHookWebpackConfig Function: (webpack.Configuration) => webpack.Configuration
 */
module.exports = (env, onHookWebpackConfig) => {
  let config = webpackConfig(env);

  if (onHookWebpackConfig) {
    config = onHookWebpackConfig(config);
  }

  if (env === 'development' && process.env.DISABLE_DEV_SERVER !== 'true') {
    const devServerOptions = {
      port: 9000,
      contentBase: resolvePath('.tmp'),
      contentBasePublicPath: getPublicUrlOrPath(true),
      watchContentBase: true,
      hot: true,
      injectClient: true,
      // publicPath: getPublicUrlOrPath(true),
      open: true,
      stats: {
        colors: true,
      },
      ...config.devServer,
    };

    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(devServerOptions.port, '127.0.0.1', () => {
      console.log(`Starting server on http://localhost:${devServerOptions.port}`);
    });
  } else {
    webpack(config, webpackCallback);
  }
};
