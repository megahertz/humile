'use strict';

const diffBuilder        = require('./builders/details/diff');
const expectationBuilder = require('./builders/details/expectation');
const failedSpecBuilder  = require('./builders/details/failedSpec');
const failedSuiteBuilder = require('./builders/details/failedSuite');
const pendingSpecBuilder = require('./builders/details/pendingSpec');
const specBuilder        = require('./builders/spec/line');
const incompleteBuilder  = require('./builders/incomplete');
const totalBuilder       = require('./builders/total');
const Printer            = require('./tools/Printer');
const SpecStats          = require('./tools/SpecStats');

/**
 * Reporter options
 * @typedef {object} ReporterOptions
 * @property {WritableStream} [stream]
 * @property {boolean}        [showColors]
 * @property {number}         [padding]
 */

class DefaultReporter {
  /**
   * @param {ReporterOptions} options
   */
  constructor(options) {
    this.initDefaults(options);
    Object.assign(this, options);
    this.initBuilders(options);
  }

  jasmineStarted() {
    this.stats = new SpecStats();
  }

  jasmineDone(result) {
    const { builders, printer, stats } = this;

    stats.stopTimer();

    if (builders.spec !== builders.none) {
      printer.writeLn('');
    }

    if (stats.failedSpecs.length > 0 && builders.failedSpec !== builders.none) {
      printer.writeLn('Failures:', { indent: Math.max(0, this.padding - 2) });
      this.padding > 1 && printer.writeLn('');

      printer.batch(stats.failedSpecs.map(builders.failedSpec));
    }

    if (builders.failedSuite !== builders.none) {
      printer.batch(stats.failedSuites.map(builders.failedSuite));
      printer.batch(builders.failedSuite(result));
    }

    if (stats.pendingSpecs.length > 0
      && builders.pendingSpec !== builders.none) {
      printer.writeLn('Pending:', { indent: Math.max(0, this.padding - 2) });
      this.padding > 1 && printer.writeLn('');

      printer.batch(stats.pendingSpecs.map(builders.pendingSpec));
    }

    printer.batch(builders.total(stats));
    printer.batch(builders.incomplete(result));
  }

  specDone(result) {
    this.stats.specCount++;

    if (result.status === 'pending') {
      this.stats.pendingSpecs.push(result);
    } else if (result.status === 'failed') {
      this.stats.failedSpecs.push(result);
    }

    this.printer.batch(this.builders.spec(result));
  }

  suiteDone(result) {
    if (result.failedExpectations && result.failedExpectations.length > 0) {
      this.stats.failedSuites.push(result);
    }
  }

  /**
   * @protected
   */
  initBuilders() {
    const padding = this.padding;

    const diff = diffBuilder({ padding, showColors: this.printer.showColors });
    const expectation = expectationBuilder({ padding, diff });

    this.builders = {
      diff,
      expectation,
      failedSpec: failedSpecBuilder({ padding, expectation }),
      failedSuite: failedSuiteBuilder({ padding, expectation }),
      incomplete: incompleteBuilder(),
      none: () => [],
      pendingSpec: pendingSpecBuilder({ padding }),
      spec: specBuilder(),
      total: totalBuilder(),
    };
  }

  /**
   * @param {ReporterOptions} options
   * @protected
   */
  initDefaults(options) {
    /** @type {SpecStats} */
    this.stats = new SpecStats();

    /** @type {Printer} */
    this.printer = new Printer({
      stream: options.stream || process.stderr,
      showColors: options.showColors,
    });

    this.padding = 1;
  }
}

module.exports = DefaultReporter;
