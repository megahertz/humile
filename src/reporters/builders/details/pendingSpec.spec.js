'use strict';

const { describe, it, expect } = require('../../..');
const pendingSpecBuilder       = require('./pendingSpec');

describe('pendingSpecBuilder', () => {
  it('should build pending spec data', () => {
    const builder = pendingSpecBuilder();
    const suiteResult = {
      fullName: 'pending test',
      pendingReason: '-',
    };

    expect(builder(suiteResult, 1)).toEqual([
      { text: '2) pending test', newLine: true },
      { text: '-', color: 'cyan', indent: 1, newLine: true },
      { text: '', newLine: true },
    ]);
  });
});
