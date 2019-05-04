'use strict';

const concordance = require('concordance');
const color       = require('../../tools/color');

module.exports = diffBuilder;

function diffBuilder(showColors) {
  const theme = showColors ? createTheme() : {};

  return function build(expected, actual) {
    const options = { maxDepth: 1, theme };

    let diff = concordance.diffDescriptors(
      concordance.describe(expected, options),
      concordance.describe(actual, options),
      options
    );

    if (showColors) {
      diff = color.gray + markDiffLine(diff) + color.unset;
    }

    return { text: diff, newLine: true };
  };
}

function createTheme() {
  return {
    string: {
      diff: {
        insert: { open: color.bgRed, close: color.unset + color.gray },
        delete: { open: color.bgGreen, close: color.unset + color.gray },
      },
    },
  };
}

function markDiffLine(diff) {
  return diff
    .split('\n')
    .map((line) => {
      if (line[0] === '-') {
        return color.green + replaceGray(line, color.green) + color.gray;
      }

      if (line[0] === '+') {
        return color.red + replaceGray(line, color.red) + color.gray;
      }

      return line;
    })
    .join('\n');
}

function replaceGray(line, newColor) {
  return line.split(color.gray).join(newColor);
}
