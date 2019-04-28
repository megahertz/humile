'use strict';

class Printer {
  constructor(options = {}) {
    /** @type {WritableStream} */
    this.stream = null;

    this.colors = {
      unset: '\x1b[0m',
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    };

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

    if (data && data.text) {
      this.write(data.text, data.options || {});
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
      const startColor = this.colors[options.color] || '';
      value = startColor + value + this.colors.unset;
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
