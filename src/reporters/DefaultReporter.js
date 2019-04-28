'use strict';

const failedSpecBuilder  = require('./builders/details/failedSpec');
const failedSuiteBuilder = require('./builders/details/failedSuite');
const pendingSpecBuilder = require('./builders/details/pendingSpec');
const specBuilder        = require('./builders/spec/line');
const incompleteBuilder  = require('./builders/incomplete');
const totalBuilder       = require('./builders/total');
const Printer            = require('./tools/Printer');
const SpecStats          = require('./tools/SpecStats');

class DefaultReporter {
  /**
   * @param {object}         options
   * @param {WritableStream} options.stream
   * @param {boolean}        options.showColors
   */
  constructor(options) {
    /** @type {SpecStats} */
    this.stats = new SpecStats();

    /** @type {Printer} */
    this.printer = new Printer({
      stream: options.stream || process.stderr,
      showColors: options.showColors,
    });

    Object.assign(this, options);

    this.builders = {
      failedSpec: failedSpecBuilder(),
      failedSuite: failedSuiteBuilder(),
      incomplete: incompleteBuilder(),
      none: () => [],
      pendingSpec: pendingSpecBuilder(),
      spec: specBuilder(),
      total: totalBuilder(),
    };
  }

  /**
   * @protected
   */
  jasmineStarted() {
    this.stats = new SpecStats();
  }

  /**
   * @protected
   */
  jasmineDone(result) {
    const { builders, printer, stats } = this;

    stats.stopTimer();

    printer.writeLn('');

    if (stats.failedSpecs.length > 0 && builders.failedSpec !== builders.none) {
      printer.writeLn('Failures:');
      printer.batch(stats.failedSpecs.map(builders.failedSpec));
    }

    if (builders.failedSuite !== builders.none) {
      printer.batch(stats.failedSuites.map(builders.failedSuite));
      printer.batch(builders.failedSuite(result));
    }

    if (stats.pendingSpecs.length > 0
      && builders.pendingSpec !== builders.none) {
      printer.writeLn('Pending:');
      printer.batch(stats.pendingSpecs.map(builders.pendingSpec));
    }

    printer.batch(builders.total(stats));
    printer.batch(builders.incomplete(result));
  }

  /**
   * @protected
   */
  specDone(result) {
    this.stats.specCount++;

    if (result.status === 'pending') {
      this.stats.pendingSpecs.push(result);
    } else if (result.status === 'failed') {
      this.stats.failedSpecs.push(result);
    }

    this.printer.batch(this.builders.spec(result));
  }

  /**
   * @protected
   */
  suiteDone(result) {
    if (result.failedExpectations && result.failedExpectations.length > 0) {
      this.stats.failedSuites.push(result);
    }
  }
}

module.exports = DefaultReporter;
