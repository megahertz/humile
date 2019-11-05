'use strict';

class StackItem {
  constructor({ context, source = null, line = null, position = null }) {
    this.context = context;
    this.source = source;
    this.line = line;
    this.position = position;
  }

  isEmpty() {
    return !this.context && !this.source;
  }

  /**
   *
   * @param {object} formatOptions
   * @param {function} [formatOptions.formatPath]
   * @param {function} [formatOptions.indent]
   * @return {Array<{color?: string, text?: string, newLine?: boolean}>|null}
   */
  print(formatOptions = {}) {
    if (this.isEmpty()) {
      return [];
    }

    let formatPath = formatOptions && formatOptions.formatPath;
    if (typeof formatPath !== 'function') {
      formatPath = src => src;
    }

    const lines = [
      { text: 'at', color: 'gray', indent: formatOptions.indent },
    ];

    if (this.context) {
      lines.push({ text: ` ${this.context}`, color: 'gray' });
    }

    if (this.source) {
      lines.push({ text: ' (', color: 'gray' });
      lines.push({ text: formatPath(this.source), color: 'gray' });

      if (Number.isInteger(this.line)) {
        lines.push({ text: `:${this.line}`, color: 'gray' });
        if (Number.isInteger(this.position)) {
          lines.push({ text: `:${this.position}`, color: 'gray' });
        }
      }

      lines.push({ text: ')', color: 'gray' });
    }

    lines.push({ text: '', newLine: true });

    return lines;
  }
}

module.exports = StackItem;
