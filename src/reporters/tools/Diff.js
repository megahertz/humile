'use strict';

const concordance = require('concordance');
const color = require('./color');

class Diff {
  /**
   * @param {object} options
   * @param {boolean} options.showColors
   */
  constructor(options = {}) {
    this.theme = this.createTheme(options);
    this.showColors = options.showColors;
  }

  diff(expected, actual) {
    const options = { maxDepth: 1, theme: this.theme };

    const resetColor = this.showColors ? color.unset : '';

    return concordance.diffDescriptors(
      concordance.describe(expected, options),
      concordance.describe(actual, options),
      options
    ) + resetColor;
  }

  createTheme({ showColors }) {
    const red = showColors ? color.red : '';
    const green = showColors ? color.green : '';
    const gray = showColors ? color.gray : '';

    const open = gray;
    const close = gray;

    return {
      bigInt: { open, close },
      boolean: { open, close },
      circular: gray + '[Circular]',
      date: {
        invalid: gray + 'invalid',
        value: { open, close },
      },
      diffGutters: {
        actual:  green + '- ' + close,
        expected: red + '+ ' + close,
        padding: '  ',
      },
      error: {
        ctor: { open: gray + '(', close: gray + ')' },
        name: { open, close },
      },
      function: {
        name: { open, close },
        stringTag: { open, close },
      },
      global: { open, close },
      item: {
        after: gray + ',',
        customFormat: null,
        increaseValueIndent: false,
      },
      list: { openBracket: gray + '[', closeBracket: gray + ']' },
      mapEntry: {
        after: gray + ',',
        separator: gray + ' => ',
      },
      maxDepth: gray + '…',
      null: { open, close },
      number: { open, close },
      object: {
        openBracket: open + '{',
        closeBracket: gray + '}',
        ctor: { open, close },
        stringTag: { open: gray + '@', close },
        secondaryStringTag: { open: gray + '@', close },
      },
      property: {
        after: gray + ',',
        customFormat: null,
        keyBracket: { open: gray + '[', close: gray + ']' },
        separator: gray + ': ',
        increaseValueIndent: false,
      },
      regexp: {
        source: { open: gray + '/', close: gray + '/' },
        flags: { open, close },
        separator: gray + '---',
      },
      stats: { separator: gray + '---' },
      string: {
        open,
        close,
        line: { open: gray + "'", close: gray + "'", escapeQuote: gray + "'" },
        multiline: {
          start: gray + '`',
          end: gray + '`',
          escapeQuote: gray + '``',
        },
        controlPicture: { open, close },
        diff: {
          insert: { open: color.bgRed, close: color.unset },
          delete: { open: color.bgGreen, close: color.unset },
          equal: { open, close },
          insertLine: { open, close },
          deleteLine: { open, close },
        },
      },
      symbol: { open, close },
      typedArray: {
        bytes: { open, close },
      },
      undefined: { open, close },
    };
  }
}

module.exports = Diff;
