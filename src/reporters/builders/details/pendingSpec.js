'use strict';

module.exports = pendingSpecBuilder;

function pendingSpecBuilder({ padding = 1 } = {}) {
  return function build(specResult, pendingSpecNumber) {
    return [
      {
        text: `${pendingSpecNumber + 1}) ${specResult.fullName}`,
        newLine: true,
        indent: Math.max(padding - 1, 0),
      },
      {
        text: specResult.pendingReason || 'No reason given',
        color: 'cyan',
        indent: padding,
        newLine: true,
      },
      padding ? { text: '', newLine: true } : null,
    ];
  };
}
