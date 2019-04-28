'use strict';

const failedExpectationBuilder = require('./failedExpectation');

module.exports = failedSuiteBuilder;

function failedSuiteBuilder() {
  const failedExpectation = failedExpectationBuilder();

  return function build(suiteResult) {
    const isResultEmpty = !suiteResult || !suiteResult.failedExpectations
      || suiteResult.failedExpectations.length < 1;

    if (isResultEmpty) {
      return [];
    }

    return [
      {
        text: `Suite error ${suiteResult.fullName}`,
        options: { newLine: true },
      },
      failedExpectation(suiteResult),
      { text: '', options: { newLine: true } },
    ];
  };
}
