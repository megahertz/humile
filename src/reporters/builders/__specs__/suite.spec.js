'use strict';

const { describe, it, expect } = require('../../../index');
const suiteBuilder = require('../suite');

describe('suiteBuilder', () => {
  it('should build first-level suite', () => {
    const builder = suiteBuilder();

    expect(builder({ description: 'test' }, 0)).toEqual([
      { text: 'test', indent: 0, newLine: true },
    ]);
  });

  it('should build second-level suite', () => {
    const builder = suiteBuilder();

    expect(builder({ description: 'test' }, 1)).toEqual([
      { text: 'test', indent: 1, newLine: true },
    ]);
  });
});
