'use strict';

const { describe, it, expect } = require('../../../..');
const { parseStack } = require('../index');
const Stack = require('../Stack');
const StackItem = require('../StackItem');

describe('reporters/utils/stack', () => {
  describe('parseStack', () => {
    it('parses simple stack', () => {
      const expectedStack = new Stack('Error text', [
        new StackItem({
          context: '<Jasmine>',
          source: null,
          line: null,
          position: null,
        }),
        new StackItem({
          context: 'UserContext.it',
          source: '/project/src/__specs__/index.spec.js',
          line: 9,
          position: 10,
        }),
      ]);

      const parsedStack = parseStack(`
        Error: Error text
        at <Jasmine>
        at UserContext.it (/project/src/__specs__/index.spec.js:9:10)
      `);

      expect(parsedStack).toEqual(expectedStack);
    });
  });
});
