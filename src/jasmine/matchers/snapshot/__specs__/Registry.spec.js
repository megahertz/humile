'use strict';

const { describe, expect, it } = require('../../../..');
const Registry = require('../Registry');

describe('matcher/snapshot/Registry', () => {
  const registry = new Registry(() => __filename);

  beforeEach(() => {
    registry.save('spec1', '{ val1: 1, val2: 2 }');
  });

  afterEach(() => {
    registry.purge();
  });

  it('load', () => {
    expect(registry.load('spec1')).toEqual('{ val1: 1, val2: 2 }');
  });

  it('save', () => {
    registry.save('spec2', 'Spec2 data');
    expect(registry.load('spec2')).toEqual('Spec2 data');
  });
});
