'use strict';

const concordance = require('concordance');
const color = require('../../tools/color');

module.exports = diffBuilder;

function diffBuilder({ showColors, style = {} }) {
  const actualColor = color.get(style.actualColor, 'red');
  const actualTextColor = color.getBg(style.actualTextColor, 'red');
  const actualSign = style.actualSign || '-';
  const expectedColor = color.get(style.expectedColor, 'green');
  const expectedTextColor = color.getBg(style.expectedTextColor, 'green');
  const expectedSign = style.expectedSign || '+';
  const expectedFirst = Boolean(style.expectedFirst);

  const theme = createTheme(showColors);

  return function build(expected, actual) {
    const options = { maxDepth: 1, theme };

    /** @type {string} */
    let diff = concordance.diffDescriptors(
      concordance.describe(expectedFirst ? expected : actual, options),
      concordance.describe(expectedFirst ? actual : expected, options),
      options
    );

    if (showColors) {
      diff = color.gray + markDiffLine(diff) + color.unset;
    }

    return { text: diff, newLine: true };
  };

  function createTheme(useColors) {
    const result = {
      diffGutters: {
        actual: expectedFirst ? `${expectedSign} ` : `${actualSign} `,
        expected: expectedFirst ? `${actualSign} ` : `${expectedSign} `,
      },
    };

    if (useColors) {
      const insert = expectedFirst ? actualTextColor : expectedTextColor;
      const del = expectedFirst ? expectedTextColor : actualTextColor;

      result.string = {
        diff: {
          insert: { open: insert, close: color.unset + color.gray },
          delete: { open: del, close: color.unset + color.gray },
        },
      };
    }

    return result;
  }

  function markDiffLine(diff) {
    return diff
      .split('\n')
      .map((line) => {
        if (line[0] === actualSign) {
          return actualColor + replaceGray(line, actualColor) + color.gray;
        }

        if (line[0] === expectedSign) {
          return expectedColor + replaceGray(line, expectedColor) + color.gray;
        }

        return line;
      })
      .join('\n');
  }

  function replaceGray(line, newColor) {
    return line.split(color.gray).join(newColor);
  }
}
