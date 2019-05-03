'use strict';


module.exports = failedSuiteBuilder;

function failedSuiteBuilder(expectation) {
  return function build(suiteResult) {
    const isResultEmpty = !suiteResult || !suiteResult.failedExpectations
      || suiteResult.failedExpectations.length < 1;

    if (isResultEmpty) {
      return [];
    }

    return [
      { text: `Suite error ${suiteResult.fullName}`, newLine: true },
      expectation(suiteResult),
      { text: '', newLine: true },
    ];
  };
}
