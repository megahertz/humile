'use strict';

module.exports = incompleteBuilder;

function incompleteBuilder() {
  return function build(suiteResult) {
    if (suiteResult && suiteResult.overallStatus === 'incomplete') {
      return [
        { text: `Incomplete: ${suiteResult.incompleteReason}`, newLine: true },
      ];
    }

    return [];
  };
}
