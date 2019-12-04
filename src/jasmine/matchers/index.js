'use strict';

const { toMatchSnapshotFactory } = require('./snapshot/index');

module.exports = {
  registerMatchers,
};

/**
 * @param {MatcherHelper} helper
 */
function registerMatchers(helper) {
  helper.registerMatchers({
    toMatchSnapshot: toMatchSnapshotFactory(helper),
  });
}
