'use strict';

const DefaultReporter = require('./DefaultReporter');
const JasmineReporter = require('./JasmineReporter');

module.exports = function createReporter(name, options) {
  switch (name) {
    case 'jasmine': return new JasmineReporter(options);
    default: return new DefaultReporter(options);
  }
};
