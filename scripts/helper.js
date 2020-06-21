function getSplitChunksOptions() {
  return {
    cacheGroups: {
      'vendor-polyfill': {
        test: /[\\/]node_modules[\\/](core-js|object-assign|promise|raf|regenerator-runtime|whatwg-fetch)[\\/]/,
        name: 'vendor-polyfill',
        chunks: 'all',
      },
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
  };
}

function runWebpackConfigCallback(config) {
  const newConfig = {
    ...config,
    optimization: {
      ...config.optimization,
      splitChunks: (process.env.SPLIT_CHUNKS !== 'false') && getSplitChunksOptions(),
    },
  };
  return newConfig;
}

module.exports = {
  getSplitChunksOptions,
  runWebpackConfigCallback,
};
