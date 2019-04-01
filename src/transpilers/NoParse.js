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

  tryInitialize() {
    // noinspection JSDeprecatedSymbols
    const extensions = require.extensions;

    this.extensions.forEach((extension) => {
      if (!extensions[extension]) {
        extensions[extension] = () => {};
      }
    });

    return true;
  }
}

module.exports = NoParse;
