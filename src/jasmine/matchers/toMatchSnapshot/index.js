'use strict';

const { format } = require('../../../utils/formatter/format');
const { parseStack } = require('../../../utils/stack');
const Registry = require('./Registry');

module.exports = {
  toMatchSnapshotFactory,
};

/**
 * @param {MatcherHelper} helper
 * @param {function} getSpecFileCb
 */
function toMatchSnapshotFactory(helper, getSpecFileCb = null) {
  const registry = new Registry(getSpecFileCb || getSpecFilePath);

  return function toMatchSnapshot(matchersUtil) {
    return {
      compare(actualValue) {
        const expectationId = helper.makeExpectationId();
        const { actual, snapshot } = fetchSnapshot(actualValue, expectationId);
        const pass = matchersUtil.equals(actual, snapshot);

        if (!pass) {
          // Jasmine passes only original values to reporter, so there is no
          // information about snapshot value.
          helper.addSpecResultMeta(expectationId, {
            actual,
            expected: snapshot,
          });
        }

        return {
          pass,
          message: (
            `Expected actual ${pass ? 'not ' : ''}to match snapshot:`
            + ` "${expectationId}".`
          ),
        };
      },
    };
  };

  function fetchSnapshot(actualValue, expectationId) {
    const actual = format(actualValue);

    let snapshot = registry.load(expectationId);
    if (snapshot === undefined) {
      snapshot = actual;
      registry.save(expectationId, actual);
    }

    return { actual, snapshot };
  }

  function getSpecFilePath() {
    const stack = parseStack(new Error().stack);
    const matcherIndex = stack.items
      .findIndex(item => item.context === 'Expectation.toMatchSnapshot');

    if (matcherIndex < 0) {
      throw new Error("Can't detect spec file");
    }

    const specItem = stack.items[matcherIndex + 1];
    if (specItem.context !== 'UserContext.<anonymous>') {
      throw new Error("Can't detect spec file");
    }

    return specItem.source;
  }
}
