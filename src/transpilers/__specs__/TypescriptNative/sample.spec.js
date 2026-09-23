'use strict';

const path = require('path');
const { describe, it, expect } = require('../../..');

const TypescriptNative = require('../../TypescriptNative');

describe('transpilers/TypescriptNative', () => {
  const native = new TypescriptNative();

  if (!native.tryInitialize()) {
    it('skips when Node.js has no type stripping', () => {});
    return;
  }

  it('should load TS natively', () => {
    // eslint-disable-next-line
    expect(require(path.join(__dirname, 'sample.mts')).result).toBe(true);
  });
});
