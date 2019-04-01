'use strict';

const path = require('path');

class TranspilerManager {
  constructor() {
    /** @type {AbstractTranspiler[]} */
    this.transpilers = [];
  }

  /**
   * @param {AbstractTranspiler} transpiler
   */
  addTranspiler(transpiler) {
    this.transpilers.push(transpiler);
  }

  checkTranspiler(fileName) {
    const ext = path.extname(fileName);

    // noinspection JSDeprecatedSymbols
    if (!ext || require.extensions[ext]) {
      return;
    }

    const availableTranspilers = this.findTranspilersForExtension(ext);
    const isInitialized = availableTranspilers.some(t => t.tryInitialize());

    if (!isInitialized) {
      this.showTranspilerWarning(availableTranspilers, fileName);
    }
  }

  showTranspilerWarning(availableTranspilers, fileName) {
    let message = `${fileName} requires a transpiller installed.\n`;

    if (availableTranspilers.length < 1) {
      throw new Error(message);
    }

    if (availableTranspilers.length === 1) {
      const transpiler = availableTranspilers[0];
      throw new Error(
        `${message}You can install ${transpiler.getHelp()}`
      );
    }

    message += availableTranspilers.reduce((result, transpiler) => {
      return `${result}\n${transpiler.getHelp()}\n`;
    }, 'You can install one of the following:\n');

    throw new Error(message);
  }

  /**
   * @param {string} ext
   * @returns {AbstractTranspiler[]}
   * @private
   */
  findTranspilersForExtension(ext) {
    return this.transpilers.filter((transpiler) => {
      return transpiler.getExtensions().includes(ext);
    });
  }
}

module.exports = TranspilerManager;
