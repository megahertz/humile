'use strict';

const Timer = require('./Timer');

describe('reporter/tools/Timer', () => {
  it('should return time in ms for interval less than 5 s', () => {
    const timer = new Timer();
    timer.startedTime = new Date(Date.now() - 2000);
    const elapsed = timer.getElapsed();
    expect(elapsed).toMatch(/\dms$/);
    expect(elapsed.replace('ms', '')).toBeGreaterThanOrEqual(2000);
    expect(elapsed.replace('ms', '')).toBeLessThan(2100);
  });

  it('should return time in sec for interval greater than 5 s', () => {
    const timer = new Timer();
    timer.startedTime = new Date(Date.now() - 6000);
    const elapsed = timer.getElapsed();
    expect(elapsed).toMatch(/\ds$/);
    expect(elapsed.replace('s', '')).toBeGreaterThanOrEqual(6);
    expect(elapsed.replace('s', '')).toBeLessThan(6.1);
  });
});
