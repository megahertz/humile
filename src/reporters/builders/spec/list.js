'use strict';

const { timeMs } = require('../../utils/format');

module.exports = listSpecBuilder;

function listSpecBuilder({
  padding = 1,
  specStartTime = {},
  slowMetric = 75,
} = {}) {
  const STATUS_MAP = {
    passed:  { char: '✓', color: 'green', textColor: 'gray' },
    pending: { char: '⌛', color: 'cyan', textColor: 'cyan' },
    failed:  { char: '✕', color: 'red', textColor: 'red' },
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
  const time = new Date() - startTime;

  let color;
  if (time > slowMetric) {
    color = 'red';
  } else if (time > slowMetric / 2) {
    color = 'yellow';
  } else if (time > slowMetric / 4) {
    color = 'gray';
  } else {
    return null;
  }

  return { text: ` (${timeMs(time)})`, color };
}
