'use strict';

var Options = require('./Options');

describe('Options', function () {
  it('should use default values', function () {
    var options = new Options();
    expect(options.masks).toEqual([
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
      '!+(node_modules|dist)/**',
    ]);
  });

  it('should load values', function () {
    // noinspection JSCheckFunctionSignatures
    var options = new Options({ _: ['unit/*.test.ts'], r: 'ts-node/register' });

    expect(options.masks).toEqual(['unit/*.test.ts']);
    expect(options.require).toEqual(['ts-node/register']);
  });
});
