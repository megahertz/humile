'use strict';

module.exports = expectationBuilder;

const DIFF_MATCHERS = [
  'toBe',
  'toBeGreaterThanOrEqual',
  'toBeLessThanOrEqual',
  'toEqual',
];

function expectationBuilder({ diff, padding = 1, style = {} }) {
  const actualColor = style.actualColor || 'red';
  const actualSign = style.actualSign || '-';
  const expectedColor = style.expectedColor || 'green';
  const expectedSign = style.expectedSign || '+';


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
        formatStack(failed.stack),
      ];

      if (diff && isDiffRequired(failed)) {
        data.push({ text: '', newLine: true });
        data.push({ text: 'expect( ', indent: padding });
        data.push({ text: `${actualSign} actual`, color: actualColor });
        data.push({ text: ` ).${failed.matcherName}( ` });
        data.push({ text: `${expectedSign} expected`, color: expectedColor });
        data.push({ text: ' )', newLine: true });

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

  function formatStack(stack) {
    if (!stack) {
      return null;
    }

    const lines = stack
      .split('\n')
      .filter(line => line.trim().startsWith('at'));

    if (lines[0] === '    at <Jasmine>') {
      lines.shift();
    }

    if (lines[lines.length - 1] === '    at <Jasmine>') {
      lines.pop();
    }

    return {
      text: lines.join('\n'),
      color: 'gray',
      indent: Math.max(0, padding - 1),
      newLine: true,
    };
  }
}

function isDiffRequired(expectation) {
  if (!expectation) {
    return false;
  }

  if (!DIFF_MATCHERS.includes(expectation.matcherName)) {
    return false;
  }

  // noinspection RedundantIfStatementJS
  if (!expectation.expected && !expectation.actual) {
    return false;
  }

  return true;
}
