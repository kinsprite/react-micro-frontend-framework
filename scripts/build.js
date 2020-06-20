const scripts = require('react-micro-frontend-scripts');

function build() {
  // --- ENV for 'production' only ---
  process.env.PUBLIC_ROOT_URL = '/';
  // process.env.GENERATE_SOURCEMAP = 'true';

  // --- ENV for ALL ---
  // process.env.IMAGE_INLINE_SIZE_LIMIT = '1000';
  // process.env.REACT_MICRO_FRONTEND_SHORT = 'rmf';
  process.env.ENABLE_SPLIT_CHUNKS = 'true';
  // process.env.ENABLE_RUNTIME_CHUNK = 'true';

  scripts.runWebpack(scripts.envProduction, (config) => {
    const newConfig = {
      ...config,
      optimization: {
        ...config.optimization,
        splitChunks: (process.env.ENABLE_SPLIT_CHUNKS === 'true') && {
          cacheGroups: {
            'vendor-react': {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              name: 'vendor-react',
              chunks: 'all',
            },
            'vendor-redux': {
              test: /[\\/]node_modules[\\/](redux|react-redux|redux-thunk|redux-saga|connected-react-router|rxjs|redux-observable)[\\/]/,
              name: 'vendor-redux',
              chunks: 'all',
            },
          },
        },
      },
    };
    return newConfig;
  });
}

build();
