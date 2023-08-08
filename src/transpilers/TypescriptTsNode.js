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
      this.safeRequire('ts-node').register({
        transpileOnly: true,
        compilerOptions: {
          module: 'CommonJS',
        },
      });
    } catch (e) {
      return false;
    }

    this.safeRequire('tsconfig-paths/register');

    return true;
  }
}

module.exports = TypescriptTsNode;
