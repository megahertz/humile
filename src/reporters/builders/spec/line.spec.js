'use strict';

const lineSpecBuilder = require('./line');

describe('lineSpecBuilder', () => {
  const builder = lineSpecBuilder();

  it('should build char string depending on status', () => {
    expect(builder({ status: 'passed' })).toEqual([
      { text: '.', options: { color: 'green' } },
    ]);

    expect(builder({ status: 'pending' })).toEqual([
      { text: '*', options: { color: 'cyan' } },
    ]);

    expect(builder({ status: 'failed' })).toEqual([
      { text: 'F', options: { color: 'red' } },
    ]);
  });

  it('should return empty array if something goes wrong', () => {
    expect(builder(null)).toEqual([]);
    expect(builder({ status: 'wrong ' })).toEqual([]);
  });
});
