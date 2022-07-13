'use strict';

module.exports = {
  toMatchObjectFactory,
};

/**
 * @param {MatcherHelper} helper
 */
function toMatchObjectFactory(helper) {
  return function toMatchObject(matchersUtil) {
    return {
      compare(actualValue, expectedValue) {
        let expected = helper.jasmine.objectContaining(expectedValue);

        if (Array.isArray(expectedValue)) {
          expected = helper.jasmine.arrayContaining(expectedValue);
        }

        const pass = matchersUtil.equals(actualValue, expected);

        return {
          pass,
          message: `${pp(actualValue)} doesn't match ${pp(expectedValue)}`,
        };
      },
    };
  };
}

function pp(value) {
  return `'${JSON.stringify(value)}'`;
}
