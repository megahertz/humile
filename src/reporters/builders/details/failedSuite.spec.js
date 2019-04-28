'use strict';

const { describe, it, expect } = require('../../..');
const failedSuiteBuilder       = require('./failedSuite');

describe('failedSuiteBuilder', () => {
  it('should build failed suite data', () => {
    const builder = failedSuiteBuilder();
    const suiteResult = {
      fullName: 'some suite',
      failedExpectations: [
        { message: 'err message', stack: 'err stack' },
      ],
    };

    expect(builder(suiteResult, 1)).toEqual([
      { text: 'Suite error some suite', options: { newLine: true } },
      jasmine.anything(),
      { text: '', options: { newLine: true } },
    ]);
  });
});
