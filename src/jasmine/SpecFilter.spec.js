'use strict';

const { describe, it, expect } = require('..');
const SpecFilter = require('./SpecFilter');

describe('jasmine/SpecFilter', () => {
  it('should match any if no filter', () => {
    const filter = new SpecFilter('');
    expect(filter.test('String with abc')).toBe(true);
  });

  it('should match simple string', () => {
    const filter = new SpecFilter(' abc');
    expect(filter.test('String with abc')).toBe(true);
  });

  it('should match regexp', () => {
    const filter = new SpecFilter('abc$');
    expect(filter.test('String with abc')).toBe(true);
  });

  it('should match reverted regexp', () => {
    const filter = new SpecFilter('!abc$');
    expect(filter.test('String with abc')).toBe(false);
  });
});
