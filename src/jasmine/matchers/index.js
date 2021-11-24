'use strict';

const { toMatchSnapshotFactory } = require('./toMatchSnapshot');
const { toMatchObjectFactory } = require('./toMatchObject');

module.exports = {
  registerMatchers,
};

/**
 * @param {MatcherHelper} helper
 */
function registerMatchers(helper) {
  helper.registerMatchers({
    toMatchObject: toMatchObjectFactory(helper),
    toMatchSnapshot: toMatchSnapshotFactory(helper),
  });
}
