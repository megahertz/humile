'use strict';

const { describe, it, expect } = require('../../../index');
const format = require('../format');

describe('reporter/utils/format', () => {
  it('should format time in milliseconds', () => {
    expect(format.timeMs(1)).toBe('1ms');
    expect(format.timeMs(5000)).toBe('5s');
    expect(format.timeMs(100, 50)).toBe('0.1s');
  });
});
