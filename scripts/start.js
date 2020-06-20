const scripts = require('react-micro-frontend-scripts');

function start() {
  // --- ENV for 'development' only ---
  // process.env.DISABLE_DEV_SERVER = 'true';

  // --- ENV for ALL ---
  // process.env.IMAGE_INLINE_SIZE_LIMIT = '1000';
  // process.env.REACT_MICRO_FRONTEND_SHORT = 'rmf';
  process.env.ENABLE_SPLIT_CHUNKS = 'true';
  process.env.ENABLE_RUNTIME_CHUNK = 'true';

  scripts.runWebpack(scripts.envDevelopment, (config) => config);
}

start();
