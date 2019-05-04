'use strict';

module.exports = expectationBuilder;

function expectationBuilder(diff) {
  return function build(result) {
    return result.failedExpectations.map((failed) => {
      const data = [
        { text: failed.message, color: 'red', indent: 1, newLine: true },
        { text: formatStack(failed.stack), color: 'gray', newLine: true },
      ];

      if (diff && failed.expected && failed.actual) {
        data.push({ text: '', newLine: true });
        data.push({ text: 'Difference: ', indent: 1 });
        data.push({ text: '- Expected', color: 'green' });
        data.push({ text: ' + Received', color: 'red', newLine: true });

        data.push({
          ...diff(failed.expected, failed.actual),
          indent: 1,
          newLine: true,
        });
      }

      data.push({ text: ' ', newLine: true });

      return data;
    });
  };
}

function formatStack(stack) {
  const lines = stack
    .split('\n')
    .filter(line => line.trim().startsWith('at'));

  if (lines[0] === '    at <Jasmine>') {
    lines.shift();
  }

  if (lines[lines.length - 1] === '    at <Jasmine>') {
    lines.pop();
  }

  return lines.join('\n');
}
