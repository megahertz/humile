'use strict';

const DefaultReporter = require('./DefaultReporter');

class MiniReporter extends DefaultReporter {
  createBuilders() {
    super.createBuilders();
    this.builders.pendingSpec = this.builders.none;
    this.builders.spec = this.builders.none;
  }
}

module.exports = MiniReporter;
