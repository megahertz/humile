'use strict';

const { describe, it, expect } = require('../../../index');
const StackItem = require('../StackItem');

describe('reporters/utils/stack/StackItem', () => {
  describe('print', () => {
    it('prints normal stack item', () => {
      const item = new StackItem({
        context: 'main',
        line: 10,
        position: 15,
        source: '/project/project/index.js',
      });

      expect(item.print()).toEqual([
        { text: 'at', color: 'gray', indent: undefined },
        { text: ' main', color: 'gray' },
        { text: ' (', color: 'gray' },
        { text: '/project/project/index.js', color: 'gray' },
        { text: ':10', color: 'gray' },
        { text: ':15', color: 'gray' },
        { text: ')', color: 'gray' },
        { text: '', newLine: true },
      ]);
    });

    it('prints stack without source', () => {
      const item = new StackItem({
        context: 'main',
      });

      expect(item.print()).toEqual([
        { text: 'at', color: 'gray', indent: undefined },
        { text: ' main', color: 'gray' },
        { text: '', newLine: true },
      ]);
    });

    it('prints stack without context', () => {
      const item = new StackItem({
        line: 10,
        position: 15,
        source: '/project/project/index.js',
      });

      expect(item.print()).toEqual([
        { text: 'at', color: 'gray', indent: undefined },
        { text: ' (', color: 'gray' },
        { text: '/project/project/index.js', color: 'gray' },
        { text: ':10', color: 'gray' },
        { text: ':15', color: 'gray' },
        { text: ')', color: 'gray' },
        { text: '', newLine: true },
      ]);
    });
  });
});
