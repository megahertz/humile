'use strict';

module.exports = lineSpecBuilder;

function lineSpecBuilder() {
  const STATUS_MAP = {
    passed:  { char: '.', color: 'green' },
    pending: { char: '*', color: 'cyan' },
    failed:  { char: 'F', color: 'red' },
  };

  return function build(specResult) {
    if (!specResult) {
      return [];
    }

    const statusData = STATUS_MAP[specResult.status];

    if (!statusData) {
      return [];
    }

    return [
      { text: statusData.char, color: statusData.color },
    ];
  };
}
