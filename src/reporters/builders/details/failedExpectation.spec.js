'use strict';

const failedExpectationBuilder = require('./failedExpectation');

describe('failedExpectationBuilder', () => {
  it('should build pending spec data', () => {
    const builder = failedExpectationBuilder();
    const specResult = {
      failedExpectations: [
        { message: 'err message', stack: 'err stack' },
      ],
    };

    expect(builder(specResult, 1)).toEqual([[
      { text: 'Message:', options: { indent: 1, newLine: true } },
      {
        text: 'err message',
        options: { color: 'red', indent: 2, newLine: true },
      },
      { text: 'Stack:', options: { indent: 1, newLine: true } },
      {
        text: 'err stack',
        options: { indent: 2, newLine: true },
      },
    ]]);
  });
});
