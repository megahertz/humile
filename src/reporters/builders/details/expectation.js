'use strict';

module.exports = expectationBuilder;

function expectationBuilder({ diff, padding = 1 }) {
  return function build(result) {
    return result.failedExpectations.map((failed) => {
      const data = [
        {
          text: failed.message,
          color: 'red',
          indent: padding,
          newLine: true,
          wordWrap: true,
        },
        { text: formatStack(failed.stack), color: 'gray', newLine: true },
      ];

      if (diff && failed.expected && failed.actual) {
        data.push({ text: '', newLine: true });
        data.push({ text: 'Difference: ', indent: padding });
        data.push({ text: '- Expected', color: 'green' });
        data.push({ text: ' + Received', color: 'red', newLine: true });

        data.push({
          ...diff(failed.expected, failed.actual),
          indent: padding,
          newLine: true,
        });
      }

      padding && data.push({ text: ' ', newLine: true });

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
