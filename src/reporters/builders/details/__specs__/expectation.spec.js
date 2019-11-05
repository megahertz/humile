'use strict';

const { describe, jasmine, it, expect } = require('../../../../index');
const expectationBuilder = require('../expectation');

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
      { text: '', newLine: true },
      { text: 'expect( ', indent: 1 },
      { text: '- actual', color: 'red' },
      { text: ' ).toBe( ' },
      { text: '+ expected', color: 'green' },
      { text: ' )', newLine: true },
      { indent: 1, newLine: true },
      { text: '', newLine: true },
      jasmine.anything(),
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
          stack: 'Error: err stack',
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
      { text: ' ', newLine: true },
    ]]);
  });
});
