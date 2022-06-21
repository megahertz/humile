'use strict';

const concordance = require('concordance');

module.exports = {
  diffFactory,
};

function diffFactory({
  actualColor,
  actualTextColor,
  actualSign,
  expectedColor,
  expectedTextColor,
  expectedSign,
  expectedFirst,
  maxDepth,
  normalColor,
  resetColor,
  showColors,
}) {
  const theme = createTheme(showColors);

  return function build(expected, actual) {
    const options = { maxDepth, theme, invert: expectedFirst };

    /** @type {string} */
    let diff = concordance.diffDescriptors(
      concordance.describe(actual, options),
      concordance.describe(expected, options),
      options,
    );

    if (showColors) {
      diff = normalColor + markDiffLine(diff) + resetColor;
    }

    return diff;
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
          insert: { open: insert, close: resetColor + normalColor },
          delete: { open: del, close: resetColor + normalColor },
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
          return actualColor + replaceGray(line, actualColor) + normalColor;
        }

        if (line[0] === expectedSign) {
          return expectedColor + replaceGray(line, expectedColor) + normalColor;
        }

        return line;
      })
      .join('\n');
  }

  function replaceGray(line, newColor) {
    return line.split(normalColor).join(newColor);
  }
}
