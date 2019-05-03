'use strict';

const color = require('./color');

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
   * @param {object[]|{ text: string, options: any }} data
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
   * @param {string}  value
   * @param {object}  options
   * @param {string}  [options.color]
   * @param {boolean} [options.newLine]
   * @param {number} [options.indent]
   */
  write(value, options = {}) {
    if (!this.stream) {
      return;
    }

    value = value || '';

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
   * @param {string}  value
   * @param {object}  options
   * @param {string}  [options.color]
   * @param {boolean} [options.newLine]
   * @param {number}  [options.indent]
   */
  writeLn(value, options = {}) {
    this.write(value, { ...options, newLine: true });
  }
}

module.exports = Printer;
