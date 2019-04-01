'use strict';

const AbstractTranspiler = require('./AbstractTranspiler');

class TypescriptTsNode extends AbstractTranspiler {
  getDisplayName() {
    return 'ts-node';
  }

  getExtensions() {
    return ['.ts', '.tsx'];
  }

  getInstallGuide() {
    return ['Run: npm install -D typescript ts-node@5'];
  }

  tryInitialize() {
    try {
      // eslint-disable-next-line
      require('ts-node/register');
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = TypescriptTsNode;
