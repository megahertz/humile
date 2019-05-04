'use strict';

const DefaultReporter = require('./DefaultReporter');
const JasmineReporter = require('./JasmineReporter');
const MiniReporter = require('./MiniReporter');

/**
 * Reporter factory
 * @param {string} name
 * @param {object} options
 * @return {humile.CustomReporter}
 */
module.exports = function createReporter(name, options) {
  switch (name) {
    case 'jasmine': return new JasmineReporter(options);
    case 'mini': return new MiniReporter(options);
    default: return new DefaultReporter(options);
  }
};
