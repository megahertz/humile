'use strict';

const color = require('./color');

/**
 * Reporter options
 * @typedef {object} PrinterOptions
 * @property {string}  [text]
 * @property {string}  [color]
 * @property {boolean} [newLine=false]
 * @property {number}  [indent=0]
 * @property {boolean} [wordWrap=false]
 */

class Printer {
  constructor(options = {}) {
    /** @type {WritableStream} */
    this.stream = null;

    this.showColors = true;

    Object.assign(this, options);

    this.showColors = this.showColors && this.stream && this.stream.isTTY;
  }

  /**
   * Print multiple items
   * @param {object[] | PrinterOptions} data
   * @return {void}
   */
  batch(data) {
    if (Array.isArray(data)) {
      data.forEach(this.batch, this);
      return;
    }

    if (data && typeof data.text === 'string') {
      this.write(data.text || '', data);
    }
  }

  /**
   * @param {string}         value
   * @param {PrinterOptions} [options]
   */
  write(value, options = {}) {
    if (!this.stream) {
      return;
    }

    value = value || '';

    if (options.wordWrap && this.stream.columns) {
      const width = this.stream.columns - ((options.indent || 0) * 2);
      value = wordWrap(value, width);
    }

    if (options.indent) {
      value = value
        .split('\n').map(line => '  '.repeat(options.indent) + line)
        .join('\n');
    }

    if (options.color && this.showColors) {
      value = color(options.color, value);
    }

    if (options.newLine) {
      value += '\n';
    }

    this.stream.write(value);
  }

  /**
   * @param {string}         value
   * @param {PrinterOptions} [options]
   */
  writeLn(value, options = {}) {
    this.write(value, { ...options, newLine: true });
  }
}

module.exports = Printer;

function wordWrap(text, width) {
  return text.replace(
    new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, 'g'),
    '$1\n'
  );
}
