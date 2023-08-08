'use strict';

const AbstractTranspiler = require('./AbstractTranspiler');

class TypescriptEsbuild extends AbstractTranspiler {
  getDisplayName() {
    return 'esbuild';
  }

  getExtensions() {
    return ['.ts', '.tsx'];
  }

  getInstallGuide() {
    return ['Run: npm install -D esbuild esbuild-register'];
  }

  tryInitialize() {
    return Boolean(this.safeRequire('esbuild-register'));
  }
}

module.exports = TypescriptEsbuild;
