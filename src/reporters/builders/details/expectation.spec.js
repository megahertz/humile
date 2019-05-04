'use strict';

const { describe, it, expect } = require('../../..');
const expectationBuilder      = require('./expectation');

describe('expectationBuilder', () => {
  it('should build failed expectation data', () => {
    const builder = expectationBuilder(() => {});
    const specResult = {
      failedExpectations: [
        {
          message: 'err message',
          stack: 'at err stack',
          expected: 1,
          actual: 2,
        },
      ],
    };

    expect(builder(specResult, 1)).toEqual([[
      { text: 'err message', color: 'red', indent: 1, newLine: true },
      { text: 'at err stack', color: 'gray', newLine: true },
      { text: '', newLine: true },
      { text: 'Difference: ', indent: 1 },
      { text: '- Expected', color: 'green' },
      { text: ' + Received', color: 'red', newLine: true },
      { newLine: true, indent: 1 },
      { text: ' ', newLine: true },
    ]]);
  });
});
