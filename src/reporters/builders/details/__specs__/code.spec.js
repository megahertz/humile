'use strict';

const { describe, it, expect } = require('../../../../index');
const codeBuilder = require('../code');

describe('codeBuilder', () => {
  const code = [
    /* 01 */ 'describe("Using async/await", function() {',
    /* 02 */ '  if (!browserHasAsyncAwaitSupport()) {',
    /* 03 */ '    return;',
    /* 04 */ '  }',
    /* 05 */ '',
    /* 06 */ '  beforeEach(async function() {',
    /* 07 */ '    await soon();',
    /* 08 */ '    value = 0;',
    /* 09 */ '  });',
    /* 10 */ '',
    /* 11 */ '  it("should support async execution", async function() {',
    /* 12 */ '    await soon();',
    /* 13 */ '    value++;',
    /* 14 */ '    expect(value).toBeGreaterThan(0);',
    /* 15 */ '  });',
    /* 16 */ '});',
  ].join('\n');

  it('builds a simple listing', () => {
    const builder = codeBuilder();

    expect(builder(code, 7, 5)).toEqual([
      { text: '  ', color: undefined, indent: 0 },
      { text: '6', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '  beforeEach(async function() {', newLine: true },
      { text: '> ', color: 'red', indent: 0 },
      { text: '7', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      [
        { text: '    ' },
        { text: 'a', color: 'bgRed' },
        { text: 'wait soon();', newLine: true },
      ],
      { text: '  ', color: undefined, indent: 0 },
      { text: '8', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '    value = 0;', newLine: true },
    ]);
  });

  it('builds listing when no position', () => {
    const builder = codeBuilder();

    expect(builder(code, 7, null)).toEqual([
      { text: '  ', color: undefined, indent: 0 },
      { text: '6', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '  beforeEach(async function() {', newLine: true },
      { text: '> ', color: 'red', indent: 0 },
      { text: '7', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '    await soon();', newLine: true },
      { text: '  ', color: undefined, indent: 0 },
      { text: '8', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '    value = 0;', newLine: true },
    ]);
  });

  it('returns nothing when no lineNumber', () => {
    const builder = codeBuilder();

    expect(builder(code, null, null)).toEqual([]);
  });

  it('builds listing when problem on the first line', () => {
    const builder = codeBuilder();

    expect(builder(code, 1, null)).toEqual([
      { text: '> ', color: 'red', indent: 0 },
      { text: '1', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: 'describe("Using async/await", function() {', newLine: true },
      { text: '  ', color: undefined, indent: 0 },
      { text: '2', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '  if (!browserHasAsyncAwaitSupport()) {', newLine: true },
      { text: '  ', color: undefined, indent: 0 },
      { text: '3', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '    return;', newLine: true },
    ]);
  });

  it('builds listing when problem on the last line', () => {
    const builder = codeBuilder();

    expect(builder(code, 16, null)).toEqual([
      { text: '  ', color: undefined, indent: 0 },
      { text: '14', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '    expect(value).toBeGreaterThan(0);', newLine: true },
      { text: '  ', color: undefined, indent: 0 },
      { text: '15', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '  });', newLine: true },
      { text: '> ', color: 'red', indent: 0 },
      { text: '16', color: 'gray' },
      { text: ' │ ', color: 'gray' },
      { text: '});', newLine: true },
    ]);
  });
});
