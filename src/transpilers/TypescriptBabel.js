'use strict';

const AbstractTranspiler = require('./AbstractTranspiler');

class TypescriptBabel extends AbstractTranspiler {
  constructor() {
    super();

    this.requiredPackages = [
      '@babel/core',
      '@babel/register',
      '@babel/preset-env',
      '@babel/preset-typescript',
    ];

    this.babelRc = [
      '{',
      '  "presets": [',
      '    "@babel/preset-env",',
      '    "@babel/preset-typescript"',
      '  ]',
      '}',
    ];
  }

  getDisplayName() {
    return '@babel/register (faster but has drawbacks)';
  }

  getExtensions() {
    return ['.ts', '.tsx'];
  }

  getInstallGuide() {
    return [
      '1. Run: npm install -D ' + this.requiredPackages.join(' '),
      '2. Create .babelrc at the project root:',
      ...this.babelRc,
    ];
  }

  tryInitialize() {
    try {
      // eslint-disable-next-line
      const register = require('@babel/register');
      register({ extensions: ['.ts', '.tsx'] });
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = TypescriptBabel;
