'use strict';

const { describe, it, expect } = require('../../../../index');
const color                    = require('../../../tools/color');
const diffBuilder              = require('../diff');

describe('diffBuilder', () => {
  it('should build a simple diff', () => {
    const builder = diffBuilder({ showColors: false });

    expect(builder('expected', 'actual').text).toBe([
      "- 'actual'",
      "+ 'expected'",
    ].join('\n'));
  });

  it('should build a simple diff with "expectedFirst"', () => {
    const builder = diffBuilder({
      showColors: false,
      style: { expectedFirst: true },
    });

    expect(builder('expected', 'actual').text).toBe([
      "+ 'expected'",
      "- 'actual'",
    ].join('\n'));
  });

  it('should build diff between expected and actual data', () => {
    const builder = diffBuilder({ showColors: false });
    const actual = { a: { a: 2, b: 2 } };
    const expected = { a: { a: 1, b: 2 } };

    expect(builder(expected, actual).text).toBe([
      '  {',
      '    a: {',
      '-     a: 2,',
      '+     a: 1,',
      '      b: 2,',
      '    },',
      '  }',
    ].join('\n'));
  });

  it('should build color diff between expected and actual data', () => {
    const builder = diffBuilder({ showColors: true });
    const actual = { a: { a: 2, b: 2 } };
    const expected = { a: { a: 1, b: 2 } };

    expect(builder(expected, actual).text).toBe([
      color.gray + '  {',
      '    a: {',
      color.red + '-     a: 2,' + color.gray,
      color.green + '+     a: 1,' + color.gray,
      '      b: 2,',
      '    },',
      '  }' + color.unset,
    ].join('\n'));
  });
});
