'use strict';

const failedExpectationBuilder = require('./failedExpectation');

module.exports = failedSpecBuilder;

function failedSpecBuilder() {
  const failedExpectation = failedExpectationBuilder();

  return function build(specResult, failedSpecNumber) {
    return [
      {
        text: `${failedSpecNumber + 1}) ${specResult.fullName}`,
        options: { newLine: true },
      },
      failedExpectation(specResult),
      { text: '', options: { newLine: true } },
    ];
  };
}
