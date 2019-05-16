'use strict';

const { timeMs } = require('../../tools/format');

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

  let latestSpecTitle = '';

  return function build(specResult) {
    if (!specResult || !specResult.fullName) {
      return [];
    }

    const statusData = STATUS_MAP[specResult.status];
    if (!statusData) {
      return [];
    }

    const result = [];

    const title = specResult.fullName.replace(specResult.description, '');
    if (title && latestSpecTitle !== title) {
      if (latestSpecTitle !== '') {
        result.push({ text: '', newLine: true });
      }

      result.push({ text: title, indent: 1, newLine: true });
      latestSpecTitle = title;
    }

    result.push(
      { text: statusData.char, color: statusData.color, indent: 2 },
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
