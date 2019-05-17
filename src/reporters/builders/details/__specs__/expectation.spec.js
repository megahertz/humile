'use strict';

const { describe, it, expect } = require('../../../../index');
const expectationBuilder      = require('../expectation');

describe('expectationBuilder', () => {
  it('should build failed expectation data', () => {
    const builder = expectationBuilder({ diff: () => {} });
    const specResult = {
      failedExpectations: [
        {
          matcherName: 'toBe',
          message: 'err message',
          stack: 'at err stack',
          expected: 1,
          actual: 2,
        },
      ],
    };

    expect(builder(specResult, 1)).toEqual([[
      {
        text: 'err message',
        color: 'red',
        indent: 1,
        newLine: true,
        wordWrap: true,
      },
      { text: 'at err stack', color: 'gray', newLine: true, indent: 0 },
      { text: '', newLine: true },
      { text: 'Difference: ', indent: 1 },
      { text: '- Expected', color: 'green' },
      { text: ' + Received', color: 'red', newLine: true },
      { newLine: true, indent: 1 },
      { text: ' ', newLine: true },
    ]]);
  });

  it('should not build diff for unwanted matchers', () => {
    const builder = expectationBuilder({ diff: () => {} });
    const specResult = {
      failedExpectations: [
        {
          matcherName: 'toBeDefined',
          message: 'err message',
          stack: 'at err stack',
          expected: 1,
          actual: 2,
        },
      ],
    };

    expect(builder(specResult, 1)).toEqual([[
      {
        text: 'err message',
        color: 'red',
        indent: 1,
        newLine: true,
        wordWrap: true,
      },
      { text: 'at err stack', color: 'gray', newLine: true, indent: 0 },
      { text: ' ', newLine: true },
    ]]);
  });

  it('should build correctly when there is no data', () => {
    const builder = expectationBuilder({ diff: () => {} });
    const specResult = {
      failedExpectations: [
        {
          message: 'err message',
        },
      ],
    };

    expect(builder(specResult, 1)).toEqual([[
      {
        text: 'err message',
        color: 'red',
        indent: 1,
        newLine: true,
        wordWrap: true,
      },
      null,
      { text: ' ', newLine: true },
    ]]);
  });
});
