'use strict';

const { afterEach, describe, it, expect } = require('../../..');

const TypescriptTsNode = require('../../TypescriptTsNode');

describe('transpilers/TypescriptTsNode', () => {
  // skip slow test
  if (process.argv.indexOf('--all') < 0) {
    return;
  }

  afterEach(() => {
    // noinspection JSDeprecatedSymbols
    delete require.extensions['.ts'];
  });

  it('should prevent loading file with some extension', () => {
    const tsNode = new TypescriptTsNode();

    // eslint-disable-next-line global-require,import/no-unresolved
    expect(() => require('./sample')).toThrow();

    tsNode.tryInitialize();

    // eslint-disable-next-line global-require,import/no-unresolved
    expect(require('./sample')).toEqual({ default: { result: true } });
  });
});
