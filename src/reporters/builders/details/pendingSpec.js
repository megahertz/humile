'use strict';

module.exports = pendingSpecBuilder;

function pendingSpecBuilder() {
  return function build(specResult, pendingSpecNumber) {
    return [
      {
        text: `${pendingSpecNumber + 1}) ${specResult.fullName}`,
        options: { newLine: true },
      },
      {
        text: specResult.pendingReason || 'No reason given',
        options: { color: 'cyan', indent: 1, newLine: true },
      },
      { text: '', options: { newLine: true } },
    ];
  };
}
