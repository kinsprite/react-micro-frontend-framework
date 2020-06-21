/* eslint-disable */
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/production.min.js');
} else {
  module.exports = require('./cjs/development.js');
}
