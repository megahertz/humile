'use strict';

const DefaultReporter = require('./DefaultReporter');
const JasmineReporter = require('./JasmineReporter');
const ListReporter = require('./ListReporter');
const MiniReporter = require('./MiniReporter');

module.exports = {
  createReporter,
};

/**
 * Reporter factory
 * @param {string} name
 * @param {object} options
 * @return {humile.CustomReporter}
 */
function createReporter(name, options) {
  switch (name) {
    case 'jasmine': return new JasmineReporter(options);
    case 'mini': return new MiniReporter(options);
    case 'list': return new ListReporter(options);
    default: return new DefaultReporter(options);
  }
}
