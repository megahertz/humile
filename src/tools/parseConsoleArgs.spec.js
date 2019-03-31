'use strict';

var parseConsoleArgs = require('./parseConsoleArgs');

describe('Parse console arguments', function () {
  it('should parse short named arguments', function () {
    expect(parseConsoleArgs(['-a', '1', '-b', '2'])).toEqual({
      _: [],
      a: '1',
      b: '2',
    });
  });

  it('should parse argument separated by equals sign', function () {
    expect(parseConsoleArgs(['--a=1', '-b=2'])).toEqual({
      _: [],
      a: '1',
      b: '2',
    });
  });

  it('should parse argument separated by space', function () {
    expect(parseConsoleArgs(['--a', '1', '-b', '2'])).toEqual({
      _: [],
      a: '1',
      b: '2',
    });
  });

  it('should parse flag arguments', function () {
    expect(parseConsoleArgs(['-a', '-b'])).toEqual({
      _: [],
      a: true,
      b: true,
    });
  });

  it('should parse anonymous arguments', function () {
    expect(parseConsoleArgs(['a=1', 'b'])).toEqual({
      _: ['a=1', 'b'],
    });
  });

  it('should parse mixed arguments', function () {
    expect(parseConsoleArgs(['-a', '-b', '-c', '1', 'd'])).toEqual({
      _: ['d'],
      a: true,
      b: true,
      c: '1',
    });
  });
});
