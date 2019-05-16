'use strict';

module.exports = incompleteBuilder;

function incompleteBuilder() {
  return function build(suiteResult) {
    if (suiteResult && suiteResult.overallStatus === 'incomplete') {
      if (suiteResult.incompleteReason === 'No specs found') {
        return [
          {
            color: 'gray',
            newLine: true,
            text: suiteResult.incompleteReason,
          },
        ];
      }

      return [
        {
          color: 'yellow',
          newLine: true,
          text: `Incomplete: ${suiteResult.incompleteReason}`,
        },
      ];
    }

    return [];
  };
}
