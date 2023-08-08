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

  /**
   * Return false when can't require
   * @param {string} moduleName
   * @return {*|boolean}
   */
  safeRequire(moduleName) {
    try {
      return require(moduleName); // eslint-disable-line
    } catch (e) {
      return false;
    }
  }
}

module.exports = AbstractTranspiler;
