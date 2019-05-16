'use strict';

const TypescriptTsNode = require('../../TypescriptTsNode');

describe('transpilers/TypescriptTsNode', () => {
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
