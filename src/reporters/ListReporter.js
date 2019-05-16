'use strict';

const specBuilder     = require('./builders/spec/list');
const DefaultReporter = require('./DefaultReporter');

class ListReporter extends DefaultReporter {
  specStarted(result) {
    this.specStartTime[result.id] = new Date();
  }

  createBuilders() {
    super.createBuilders();
    this.specStartTime = {};
    this.builders.spec = specBuilder(this.specStartTime);
  }
}

module.exports = ListReporter;
