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
    return Boolean(this.safeRequire('@swc-node/register'));
  }
}

module.exports = TypescriptSwc;
