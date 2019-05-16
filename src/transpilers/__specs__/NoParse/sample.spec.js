'use strict';

const NoParse = require('../../NoParse');

describe('transpilers/NoParse', () => {
  it('should prevent loading file with some extension', () => {
    const noParse = new NoParse(['.css']);

    // eslint-disable-next-line global-require
    expect(() => require('./sample')).toThrow();

    noParse.tryInitialize();

    // eslint-disable-next-line global-require
    expect(require('./sample')).toEqual({ css: {} });

    // noinspection JSDeprecatedSymbols
    delete require.extensions['.css'];
  });
});
