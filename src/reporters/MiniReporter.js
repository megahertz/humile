'use strict';

const DefaultReporter = require('./DefaultReporter');

class MiniReporter extends DefaultReporter {
  initBuilders() {
    super.initBuilders();
    this.builders.spec = this.builders.none;
  }

  initDefaults(options) {
    super.initDefaults(options);
    this.padding = 0;
  }
}

module.exports = MiniReporter;
