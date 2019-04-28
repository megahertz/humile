'use strict';

const pendingSpecBuilder = require('./pendingSpec');

describe('pendingSpecBuilder', () => {
  it('should build pending spec data', () => {
    const builder = pendingSpecBuilder();
    const suiteResult = {
      fullName: 'pending test',
      pendingReason: '-',
    };

    expect(builder(suiteResult, 1)).toEqual([
      { text: '2) pending test', options: { newLine: true } },
      { text: '-', options: { color: 'cyan', indent: 1, newLine: true } },
      { text: '', options: { newLine: true } },
    ]);
  });
});
