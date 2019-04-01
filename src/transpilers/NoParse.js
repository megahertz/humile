'use strict';

const AbstractTranspiler = require('./AbstractTranspiler');

/**
 * Prevent loading non-standard file extensions by node, for example
 * require('style.css'), which is commonly used with webpack
 */
class NoParse extends AbstractTranspiler {
  constructor(extensions) {
    super();

    this.extensions = extensions || [];
    this.registered = [];
  }

  getDisplayName() {
    return 'noparse';
  }

  getExtensions() {
    return this.extensions;
  }

  getInstallGuide() {
    return [
      'humile --noparse .css',
    ];
  }

  restore() {
    // noinspection JSDeprecatedSymbols
    const extensions = require.extensions;
    this.registered.forEach(ext => delete extensions[ext]);
  }

  tryInitialize() {
    // noinspection JSDeprecatedSymbols
    const extensions = require.extensions;

    this.extensions.forEach((extension) => {
      if (!extensions[extension]) {
        extensions[extension] = () => {};
        this.registered.push(extension);
      }
    });

    return true;
  }
}

module.exports = NoParse;
