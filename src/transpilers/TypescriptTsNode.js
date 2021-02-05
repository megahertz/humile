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
      require('ts-node').register({
        transpileOnly: true,
        compilerOptions: {
          module: 'CommonJS',
        },
      });
    } catch (e) {
      return false;
    }

    try {
      // eslint-disable-next-line
      require('tsconfig-paths/register');
    } catch (e) {
      // it's optional dependency
    }

    return true;
  }
}

module.exports = TypescriptTsNode;
