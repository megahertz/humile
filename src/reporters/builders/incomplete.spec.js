'use strict';

const { describe, it, expect } = require('../..');
const incompleteBuilder        = require('./incomplete');

describe('incompleteBuilder', () => {
  it('should build incomplete results data', () => {
    const builder = incompleteBuilder();
    const suiteResult = {
      incompleteReason: 'test',
      overallStatus: 'incomplete',
    };

    expect(builder(suiteResult)).toEqual([
      { text: 'Incomplete: test', options: { newLine: true } },
    ]);
  });

  it('should print incomplete results', () => {
    const builder = incompleteBuilder();

    expect(builder(null)).toEqual([]);
  });
});