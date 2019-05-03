'use strict';

const { describe, it, expect } = require('../../..');
const Diff                     = require('../../tools/Diff');
const expectationBuilder      = require('./expectation');

describe('expectationBuilder', () => {
  it('should build pending spec data', () => {
    const builder = expectationBuilder(new Diff());
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
      { text: '- 1\n+ 2', newLine: true, indent: 1 },
      { text: ' ', newLine: true },
    ]]);
  });
});
