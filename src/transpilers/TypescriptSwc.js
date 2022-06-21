'use strict';

const AbstractTranspiler = require('./AbstractTranspiler');

class TypescriptSwc extends AbstractTranspiler {
  getDisplayName() {
    return 'swc';
  }

  getExtensions() {
    return ['.ts', '.tsx'];
  }

  getInstallGuide() {
    return ['Run: npm install -D @swc-node/register'];
  }

  tryInitialize() {
    try {
      // eslint-disable-next-line
      require('@swc-node/register');
    } catch (e) {
      return false;
    }

    return true;
  }
}

module.exports = TypescriptSwc;
