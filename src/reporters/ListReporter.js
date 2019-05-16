'use strict';

const specBuilder     = require('./builders/spec/list');
const DefaultReporter = require('./DefaultReporter');

class ListReporter extends DefaultReporter {
  constructor(options) {
    super(options);

    this.specStartTime = {};

    this.builders.spec = specBuilder(this.specStartTime);
  }

  specStarted(result) {
    this.specStartTime[result.id] = new Date();
  }
}

module.exports = ListReporter;
