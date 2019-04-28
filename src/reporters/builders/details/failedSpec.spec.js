'use strict';

const { describe, it, expect } = require('../../..');
const failedSpecBuilder        = require('./failedSpec');

describe('failedSpecBuilder', () => {
  it('should build failed spec data', () => {
    const builder = failedSpecBuilder();
    const suiteResult = {
      fullName: 'failed test',
      failedExpectations: [
        { message: 'err message', stack: 'err stack' },
      ],
    };

    expect(builder(suiteResult, 1)).toEqual([
      { text: '2) failed test', options: { newLine: true } },
      jasmine.anything(),
      { text: '', options: { newLine: true } },
    ]);
  });
});
