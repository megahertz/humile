'use strict';

class Stack {
  /**
   * @param {string} error
   * @param {StackItem[]} items
   */
  constructor(error, items) {
    this.error = error;
    this.items = items;
  }

  clearSystem() {
    this.items = this.items.filter((item) => {
      if (item.context === '<Jasmine>') {
        return false;
      }

      if (!item.source) {
        return true;
      }

      // noinspection RedundantIfStatementJS
      if (item.source.startsWith('internal/modules/cjs/loader')) {
        return false;
      }

      return true;
    });
    return this;
  }

  /**
   * @return {StackItem}
   */
  getFirstItem() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.every(item => item.isEmpty());
  }

  print(formatOptions) {
    return this.items.map(item => item.print(formatOptions));
  }
}

module.exports = Stack;
