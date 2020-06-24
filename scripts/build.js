const scripts = require('react-micro-frontend-scripts');

function build() {
  // --- ENV for 'production' only ---
  process.env.PUBLIC_ROOT_URL = '/';
  // process.env.GENERATE_SOURCEMAP = 'true';
  // process.env.INLINE_RUNTIME_CHUNK = 'true';
  // process.env.MINIMIZE_IN_PRODUCTION = 'true';

  // --- ENV for ALL ---
  // process.env.IMAGE_INLINE_SIZE_LIMIT = '1000';
  // process.env.REACT_MICRO_FRONTEND_SHORT = 'rmf';
  // process.env.SPLIT_CHUNKS = 'true';
  // process.env.RUNTIME_CHUNK = 'true';

  scripts.runWebpack(scripts.envProduction, (config) => {
    const newConfig = scripts.helper.webpackConfigCallback(config);
    const key = Object.keys(newConfig.entry)[0];
    // Include polyfill for production only
    newConfig.entry[key] = [scripts.resolvePath('src/polyfill'), newConfig.entry[key]];
    return newConfig;
  });
}

build();
