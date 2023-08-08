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
    return ['Run: npm install -D esbuild-register'];
  }

  tryInitialize() {
    const esBuildRegister = this.safeRequire('esbuild-register/dist/node');
    if (!esBuildRegister || !esBuildRegister.register) {
      return false;
    }

    const options = {};
    const tscPlugin = this.safeRequire('esbuild-plugin-tsc');
    if (tscPlugin) {
      options.plugins = [tscPlugin()];
    }

    try {
      esBuildRegister.register(options);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = TypescriptEsbuild;
