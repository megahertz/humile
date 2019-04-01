'use strict';

const TypescriptTsNode = require('../../../src/transpilers/TypescriptTsNode');

describe('transpilers/TypescriptTsNode', () => {
  afterEach(() => {
    // noinspection JSDeprecatedSymbols
    delete require.extensions['.ts'];
  });

  it('should prevent loading file with some extension', () => {
    const tsNode = new TypescriptTsNode();

    // eslint-disable-next-line global-require
    expect(() => require('./sample.ts')).toThrow();

    tsNode.tryInitialize();

    // eslint-disable-next-line global-require
    expect(require('./sample.ts')).toEqual({ default: { result: true } });
  });
});
