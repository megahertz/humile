'use strict';

/**
 * @abstract
 */
class AbstractTranspiler {
  /**
   * @return {string}
   * @abstract
   */
  getDisplayName() {
    throw new Error('Not implemented');
  }

  /**
   * @return {string[]}
   * @abstract
   */
  getExtensions() {
    throw new Error('Not implemented');
  }

  /**
   * @returns {string}
   */
  getHelp() {
    return this.getDisplayName() + '\n' + this.getInstallGuide().join('\n');
  }

  /**
   * @return {string[]}
   * @abstract
   */
  getInstallGuide() {
    throw new Error('Not implemented');
  }

  /**
   * @return {boolean}
   * @abstract
   */
  tryInitialize() {
    throw new Error('Not implemented');
  }
}

module.exports = AbstractTranspiler;
