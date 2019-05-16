'use strict';

module.exports = failedSpecBuilder;

function failedSpecBuilder({ expectation, padding = 1 }) {
  return function build(specResult, failedSpecNumber) {
    return [
      {
        indent: Math.max(padding - 1, 0),
        newLine: true,
        text: `${failedSpecNumber + 1}) ${specResult.fullName}`,
      },
      expectation(specResult),
    ];
  };
}
