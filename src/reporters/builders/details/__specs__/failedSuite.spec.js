'use strict';

const { describe, it, expect } = require('../../../../index');
const failedSuiteBuilder = require('../failedSuite');

describe('failedSuiteBuilder', () => {
  it('should build failed suite data', () => {
    const builder = failedSuiteBuilder({ expectation: () => null });
    const suiteResult = {
      fullName: 'some suite',
      failedExpectations: [
        { message: 'err message', stack: 'err stack' },
      ],
    };

    expect(builder(suiteResult, 1)).toEqual([
      { text: 'Suite error some suite', newLine: true },
      null,
      { text: '', newLine: true },
    ]);
  });
});
