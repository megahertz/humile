'use strict';

const AbstractTranspiler = require('./AbstractTranspiler');

/**
 * Node.js built-in type stripping, ESM specs are loaded by require(esm)
 */
class TypescriptNative extends AbstractTranspiler {
  getDisplayName() {
    return 'native';
  }

  getExtensions() {
    return ['.ts', '.mts', '.cts'];
  }

  getInstallGuide() {
    return ['Use Node.js >= 22.18'];
  }

  tryInitialize() {
    return Boolean(process.features && process.features.typescript);
  }
}

module.exports = TypescriptNative;
