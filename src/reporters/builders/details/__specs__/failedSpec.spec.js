'use strict';

const { describe, it, expect } = require('../../../../index');
const failedSpecBuilder        = require('../failedSpec');

describe('failedSpecBuilder', () => {
  it('should build failed spec data', () => {
    const builder = failedSpecBuilder(() => null);
    const suiteResult = {
      fullName: 'failed test',
      failedExpectations: [
        { message: 'err message', stack: 'err stack' },
      ],
    };

    expect(builder(suiteResult, 1)).toEqual([
      { text: '2) failed test', newLine: true },
      null,
    ]);
  });
});
