const runWebpack = require('./internal/runWebpack');

process.env.PUBLIC_ROOT_URL = '/';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.IMAGE_INLINE_SIZE_LIMIT = '1000';

runWebpack('production');
