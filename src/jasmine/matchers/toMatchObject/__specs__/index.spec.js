'use strict';

const { describe, expect, jasmine, it } = require('../../../..');
const MatcherHelper = require('../../MatcherHelper');
const { toMatchObjectFactory } = require('../index');

describe('toMatchObject', () => {
  const helper = new MatcherHelper(jasmine, jasmine.getEnv());
  const matcherUtil = jasmine.matchersUtil;

  const matcher = toMatchObjectFactory(helper)(matcherUtil);

  it('passes when a simple value matches', () => {
    expect(matcher.compare({ a: 1 }, { a: 1 }).pass).toBe(true);
  });

  it('passes when complex object passed', () => {
    const actual = { a: 1, b: { c: 1 } };
    const expected = { b: { c: 1 } };
    expect(matcher.compare(actual, expected).pass).toBe(true);
  });

  it('fails when not match', () => {
    expect(matcher.compare({ a: 1 }, { a: 2 }).pass).toBe(false);
  });
});
