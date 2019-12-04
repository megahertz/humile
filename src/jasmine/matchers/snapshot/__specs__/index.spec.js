'use strict';

const { describe, expect, jasmine, it } = require('../../../..');
const MatcherHelper = require('../../MatcherHelper');
const { toMatchSnapshotFactory } = require('../index');

describe('toMatchSnapshot', () => {
  const helper = new MatcherHelper(jasmine.getEnv());
  const matcherUtil = jasmine.matchersUtil;
  const getSpecFileCb = () => __filename;

  const matcher = toMatchSnapshotFactory(helper, getSpecFileCb)(matcherUtil);

  it('passes when a simple value matches', () => {
    expect(matcher.compare({ a: 1 }).pass).toBe(true);
  });

  it('passes when there are few matches', () => {
    expect(matcher.compare({ a: 1 }).pass).toBe(true);
    expect(matcher.compare({ a: 2 }).pass).toBe(true);
  });

  it('passes when there are special chars in snapshot', () => {
    const object = {
      a: 'value\nwith multiline',
      b: 'value`with\\`special chars',
    };

    expect(matcher.compare(object).pass).toBe(true);
  });

  it('fails when a snapshot is old', () => {
    expect(matcher.compare({ a: Date.now() }).pass).toBe(false);
  });
});
