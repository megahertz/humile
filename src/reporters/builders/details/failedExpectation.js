'use strict';

module.exports = failedExpectationBuilder;

function failedExpectationBuilder() {
  return function build(result) {
    return result.failedExpectations.map((failed) => {
      return [
        { text: 'Message:', options: { indent: 1, newLine: true } },
        {
          text: failed.message,
          options: { color: 'red', indent: 2, newLine: true },
        },
        { text: 'Stack:', options: { indent: 1, newLine: true } },
        {
          text: failed.stack,
          options: { indent: 2, newLine: true },
        },
      ];
    });
  };
}
