'use strict';

const fs = require('fs');
const { shortenPath } = require('../../../utils/path');
const { parseStack } = require('../../utils/stack');

module.exports = expectationBuilder;

const DIFF_MATCHERS = [
  'toBe',
  'toBeGreaterThanOrEqual',
  'toBeLessThanOrEqual',
  'toEqual',
];

function expectationBuilder({
  code,
  diff,
  padding = 1,
  projectPath,
  style = {},
}) {
  const actualColor = style.actualColor || 'red';
  const actualSign = style.actualSign || '-';
  const expectedColor = style.expectedColor || 'green';
  const expectedSign = style.expectedSign || '+';

  return function build(result) {
    return result.failedExpectations.map((failed) => {
      const data = [{
        text: failed.message,
        color: 'red',
        indent: padding,
        newLine: true,
        wordWrap: true,
      }];

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

      const stack = parseStack(failed.stack).clearSystem();

      if (!stack.isEmpty()) {
        data.push({ text: '', newLine: true });
        data.push(stack.print({ indent: padding, formatPath }));
      }

      const source = stack.getFirstItem();
      const codeText = readSource(source);
      if (code && codeText) {
        data.push({ text: '', newLine: true });
        data.push(code(codeText, source.line, source.position, padding));
      }

      padding && data.push({ text: ' ', newLine: true });

      return data;
    });
  };

  /**
   * @param {StackItem} stackItem
   * @return {string}
   */
  function readSource(stackItem) {
    if (!stackItem || !stackItem.source) {
      return '';
    }

    try {
      return fs.readFileSync(stackItem.source, 'utf8');
    } catch (e) {
      return '';
    }
  }

  function formatPath(stackPath) {
    return projectPath ? shortenPath(projectPath, stackPath) : stackPath;
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
