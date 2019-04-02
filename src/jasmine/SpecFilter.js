'use strict';

class SpecFilter {
  constructor(filter) {
    this.isInverted = false;

    if (!filter || !filter.substr) {
      return;
    }

    if (filter.substr(0, 1) === '!') {
      this.isInverted = true;
      filter = filter.substr(1);
    }

    this.regexp = new RegExp(filter);
  }

  test(value) {
    if (!this.regexp) {
      return true;
    }

    let isMatches = this.regexp.test(value);

    if (this.isInverted) {
      isMatches = !isMatches;
    }

    return isMatches;
  }
}

module.exports = SpecFilter;
