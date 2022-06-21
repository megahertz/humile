'use strict';

const { afterEach, describe, it, expect } = require('../../..');

const TypescriptSwc = require('../../TypescriptSwc');

describe('transpilers/TypescriptSwc', () => {
  // skip slow test
  if (process.argv.indexOf('--all') < 0) {
    it('skips', () => {});
    return;
  }

  afterEach(() => {
    // noinspection JSDeprecatedSymbols
    delete require.extensions['.ts'];
  });

  it('should transpile TS', () => {
    const tsNode = new TypescriptSwc();

    // eslint-disable-next-line
    expect(() => require('./sample')).toThrow();

    tsNode.tryInitialize();

    // eslint-disable-next-line
    expect(require('./sample')).toEqual({ default: { result: true } });
  });
});
