'use strict';

class Printer {
  constructor(options = {}) {
    /** @type {WritableStream} */
    this.stream = null;

    this.colors = {
      green: '\x1B[32m',
      red: '\x1B[31m',
      yellow: '\x1B[33m',
      none: '\x1B[0m',
    };

    this.showColors = true;

    Object.assign(this, options);

    this.showColors = this.showColors && this.stream && this.stream.isTTY;
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
      const startColor = this.colors[options.color] || '';
      value = startColor + value + this.colors.none;
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
