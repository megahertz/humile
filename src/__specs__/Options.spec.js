'use strict';

const Options = require('../Options');

describe('Options', () => {
  it('should use default values', () => {
    const options = new Options();
    expect(options.masks).toEqual([
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
      '!+(node_modules|dist)/**',
    ]);
  });

  it('should load values', () => {
    // noinspection JSCheckFunctionSignatures
    const options = new Options({
      _: ['unit/*.test.ts'],
      r: 'ts-node/register',
    });

    expect(options.masks).toEqual(['unit/*.test.ts']);
    expect(options.require).toEqual(['ts-node/register']);
  });
});
