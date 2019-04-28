'use strict';

const DefaultReporter = require('./DefaultReporter');
const JasmineReporter = require('./JasmineReporter');
const MiniReporter = require('./MiniReporter');

module.exports = function createReporter(name, options) {
  switch (name) {
    case 'jasmine': return new JasmineReporter(options);
    case 'mini': return new MiniReporter(options);
    default: return new DefaultReporter(options);
  }
};
