'use strict';

const parseConsoleArgs = require('./parseConsoleArgs');

describe('Parse console arguments', () => {
  it('should parse short named arguments', () => {
    expect(parseConsoleArgs(['-a', '1', '-b', '2'])).toEqual({
      _: [],
      a: '1',
      b: '2',
    });
  });

  it('should parse argument separated by equals sign', () => {
    expect(parseConsoleArgs(['--a=1', '-b=2'])).toEqual({
      _: [],
      a: '1',
      b: '2',
    });
  });

  it('should parse argument separated by space', () => {
    expect(parseConsoleArgs(['--a', '1', '-b', '2'])).toEqual({
      _: [],
      a: '1',
      b: '2',
    });
  });

  it('should parse flag arguments', () => {
    expect(parseConsoleArgs(['-a', '-b'])).toEqual({
      _: [],
      a: true,
      b: true,
    });
  });

  it('should parse anonymous arguments', () => {
    expect(parseConsoleArgs(['a=1', 'b'])).toEqual({
      _: ['a=1', 'b'],
    });
  });

  it('should parse mixed arguments', () => {
    expect(parseConsoleArgs(['-a', '-b', '-c', '1', 'd'])).toEqual({
      _: ['d'],
      a: true,
      b: true,
      c: '1',
    });
  });

  it('should parse array arguments', () => {
    expect(parseConsoleArgs(['-a', '1', '-a', '2', 'b'])).toEqual({
      _: ['b'],
      a: ['1', '2'],
    });
  });
});
