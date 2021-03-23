'use strict';

const listSpecBuilder = require('./builders/spec/list');
const suiteBuilder = require('./builders/suite');
const DefaultReporter = require('./DefaultReporter');

class ListReporter extends DefaultReporter {
  specStarted(result) {
    this.specStartTime[result.id] = new Date();
  }

  suiteStarted(result) {
    this.suiteLevel += 1;

    if (this.processedSuites > 0 && this.suiteLevel === 1) {
      this.printer.writeLn('');
    }

    this.printer.batch(this.builders.suite(result, this.suiteLevel));
  }

  suiteDone(result) {
    super.suiteDone(result);
    this.processedSuites += 1;
    this.suiteLevel -= 1;
  }

  specDone(result) {
    result.suiteLevel = this.suiteLevel;
    super.specDone(result);
  }

  initBuilders() {
    super.initBuilders();
    this.specStartTime = {};
    this.builders.spec = listSpecBuilder({
      slowMetric: this.slowMetric,
      specStartTime: this.specStartTime,
    });
    this.builders.suite = suiteBuilder();
  }

  initDefaults(options) {
    super.initDefaults(options);
    this.padding = 2;
    this.suiteLevel = 0;
    this.processedSuites = 0;
  }
}

module.exports = ListReporter;
