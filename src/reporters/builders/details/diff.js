'use strict';

const color = require('../../utils/color');
const { diffFactory } = require('../../../utils/formatter/diff');

module.exports = diffBuilder;

function diffBuilder({ showColors, style = {} }) {
  const isDisabled = Boolean(style.disabled);

  const diffOptions = {
    actualColor: color.get(style.actualColor, 'red'),
    actualTextColor: color.getBg(style.actualTextColor, 'red'),
    actualSign: style.actualSign || '-',
    expectedColor: color.get(style.expectedColor, 'green'),
    expectedTextColor: color.getBg(style.expectedTextColor, 'green'),
    expectedSign: style.expectedSign || '+',
    expectedFirst: Boolean(style.expectedFirst),
    maxDepth: Number(style.maxDepth || 1),
    normalColor: color.gray,
    resetColor: color.unset,
    showColors,
  };

  const diff = diffFactory(diffOptions);

  return function build(expected, actual) {
    if (isDisabled) {
      return {};
    }

    return { text: diff(expected, actual), newLine: true };
  };
}
