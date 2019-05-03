'use strict';

module.exports = pendingSpecBuilder;

function pendingSpecBuilder() {
  return function build(specResult, pendingSpecNumber) {
    return [
      {
        text: `${pendingSpecNumber + 1}) ${specResult.fullName}`,
        newLine: true,
      },
      {
        text: specResult.pendingReason || 'No reason given',
        color: 'cyan',
        indent: 1,
        newLine: true,
      },
      { text: '', newLine: true },
    ];
  };
}
