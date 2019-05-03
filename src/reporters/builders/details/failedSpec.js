'use strict';

module.exports = failedSpecBuilder;

function failedSpecBuilder(expectation) {
  return function build(specResult, failedSpecNumber) {
    return [
      {
        text: `${failedSpecNumber + 1}) ${specResult.fullName}`,
        newLine: true,
      },
      expectation(specResult),
      { text: '', newLine: true },
    ];
  };
}
