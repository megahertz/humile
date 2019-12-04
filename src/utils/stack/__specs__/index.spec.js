'use strict';

const { describe, it, expect } = require('../../../index');
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

    it('parses as statement', () => {
      const expectedStack = new Stack('Error text', [
        new StackItem({
          context: 'getSpecFilePath [as getSpecPathCallback]',
          source: 'src/snapshot.js',
          line: 35,
          position: 11,
        }),
        new StackItem({
          context: 'Registry.getSnapshotPath',
          source: 'src/Registry.js',
          line: 60,
          position: 27,
        }),
        new StackItem({
          context: '<Jasmine>',
          source: null,
          line: null,
          position: null,
        }),
      ]);

      const parsedStack = parseStack(`
        Error: Error text
        at getSpecFilePath [as getSpecPathCallback] (src/snapshot.js:35:11)
        at Registry.getSnapshotPath (src/Registry.js:60:27)
        at <Jasmine>
      `);

      expect(parsedStack).toEqual(expectedStack);
    });
  });
});
