'use strict';

const { describe, it, expect } = require('../../..');
const color                    = require('../../tools/color');
const diffBuilder              = require('./diff');

describe('diffBuilder', () => {
  it('should build diff between expected and actual data', () => {
    const builder = diffBuilder(false);
    const actual = { a: { a: 2, b: 2 } };
    const expected = { a: { a: 1, b: 2 } };

    expect(builder(expected, actual).text).toBe([
      '  {',
      '    a: {',
      '-     a: 1,',
      '+     a: 2,',
      '      b: 2,',
      '    },',
      '  }',
    ].join('\n'));
  });

  it('should build color diff between expected and actual data', () => {
    const builder = diffBuilder(true);
    const actual = { a: { a: 2, b: 2 } };
    const expected = { a: { a: 1, b: 2 } };

    expect(builder(expected, actual).text).toBe([
      color.gray + '  {',
      '    a: {',
      color.green + '-     a: 1,' + color.gray,
      color.red + '+     a: 2,' + color.gray,
      '      b: 2,',
      '    },',
      '  }' + color.unset,
    ].join('\n'));
  });
});
