'use strict';

const { describe, it, expect } = require('../..');
const totalBuilder             = require('./total');

describe('totalBuilder', () => {
  it('should build success total', () => {
    const builder = totalBuilder();

    expect(builder(createStats({ passed: 1 }))).toEqual([
      { text: '1 passed', options: { color: 'green' } },
      { text: ' (10ms)', options: { newLine: true } },
    ]);
  });

  it('should build failed total', () => {
    const builder = totalBuilder();

    expect(builder(createStats({ passed: 1, failed: 1 }))).toEqual([
      { text: '1 passed', options: { color: 'green' } },
      { text: ', ' },
      { text: '1 failed', options: { color: 'red' } },
      { text: ' (10ms)', options: { newLine: true } },
    ]);
  });

  it('should build pending total', () => {
    const builder = totalBuilder();

    expect(builder(createStats({ passed: 1, failed: 1, pending: 1 }))).toEqual([
      { text: '1 passed', options: { color: 'green' } },
      { text: ', ' },
      { text: '1 failed', options: { color: 'red' } },
      { text: ', ' },
      { text: '1 pending', options: { color: 'cyan' } },
      { text: ' (10ms)', options: { newLine: true } },
    ]);
  });

  it('should build total when no tests', () => {
    const builder = totalBuilder();

    expect(builder(createStats({}))).toEqual([
      { text: 'No specs found', options: { color: 'yellow' } },
    ]);
  });
});

function createStats({
  passed = 0,
  failed = 0,
  pending = 0,
  elapsed = '10ms',
}) {
  return {
    elapsed,
    failedCount: failed,
    passedCount: passed,
    pendingCount: pending,
    specCount: passed + failed + pending,
  };
}
