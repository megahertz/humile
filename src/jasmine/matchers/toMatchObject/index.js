'use strict';

module.exports = {
  toMatchObjectFactory,
};

/**
 * @param {MatcherHelper} helper
 */
function toMatchObjectFactory(helper) {
  return function toMatchObject(util) {
    return {
      compare(actualValue, expectedValue) {
        const expected = helper.jasmine.objectContaining(expectedValue);

        const diffBuilder = helper.jasmine.DiffBuilder({
          prettyPrinter: util.pp,
        });

        const pass = util.equals(actualValue, expected, diffBuilder);

        return {
          pass,
          message: diffBuilder.getMessage(),
        };
      },
    };
  };
}
