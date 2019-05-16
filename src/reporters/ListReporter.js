'use strict';

const specBuilder     = require('./builders/spec/list');
const DefaultReporter = require('./DefaultReporter');

class ListReporter extends DefaultReporter {
  specStarted(result) {
    this.specStartTime[result.id] = new Date();
  }

  initBuilders() {
    super.initBuilders();
    this.specStartTime = {};
    this.builders.spec = specBuilder({ specStartTime: this.specStartTime });
  }

  initDefaults(options) {
    super.initDefaults(options);
    this.padding = 2;
  }
}

module.exports = ListReporter;
