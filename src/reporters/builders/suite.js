'use strict';

module.exports = suiteBuilder;

function suiteBuilder() {
  return function build(suite, level = 0) {
    if (!suite || !suite.description) {
      return [];
    }

    return [{
      text: suite.description,
      indent: level,
      newLine: true,
    }];
  };
}
