'use strict';

const { timeMs } = require('../../utils/format');

module.exports = listSpecBuilder;

function listSpecBuilder({
  specStartTime = {},
  slowMetric = 40,
} = {}) {
  /* eslint-disable key-spacing, no-multi-spaces */
  const STATUS_MAP = {
    passed:  { char: '✓', color: 'green', textColor: 'gray' },
    pending: { char: '⌛', color: 'cyan',  textColor: 'cyan' },
    failed:  { char: '✕', color: 'red',   textColor: 'red' },
  };

  return function build(specResult) {
    if (!specResult || !specResult.fullName) {
      return [];
    }

    const statusData = STATUS_MAP[specResult.status];
    if (!statusData) {
      return [];
    }

    const result = [];

    result.push(
      {
        text: statusData.char,
        color: statusData.color,
        indent: (specResult.suiteLevel || 0) + 1,
      },
      { text: ' ' + specResult.description, color: statusData.textColor }
    );

    if (specStartTime && specStartTime[specResult.id]) {
      result.push(buildExecutionTime(specStartTime[specResult.id], slowMetric));
    }

    result.push({ text: '', newLine: true });

    return result;
  };
}

function buildExecutionTime(startTime, slowMetric) {
  const duration = new Date() - startTime;

  let color;
  if (duration > slowMetric) {
    color = 'red';
  } else if (duration > slowMetric / 2) {
    color = 'yellow';
  } else if (duration > slowMetric / 4) {
    color = 'gray';
  } else {
    return null;
  }

  return { text: ` (${timeMs(duration)})`, color };
}
