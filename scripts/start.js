const runWebpack = require('./internal/runWebpack');

process.env.DISABLE_DEV_SERVER = 'false';

runWebpack('development', (config) => {
  Object.assign(config, {
    devServer: {
    },
  });

  return config;
});
