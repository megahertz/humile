'use strict';

const Printer   = require('./tools/Printer');
const SpecStats = require('./tools/SpecStats');

const STATUS_MAP = {
  passed:  { char: '.', color: 'green' },
  pending: { char: '*', color: 'yellow' },
  failed:  { char: 'F', color: 'red' },
};

class DefaultReporter {
  constructor(options) {
    /** @type {SpecStats} */
    this.stats = new SpecStats();

    /** @type {Printer} */
    this.printer = new Printer({
      stream: options.stream || process.stderr,
      showColors: options.showColors,
    });

    /** @type {string} */
    this.jasmineCorePath = '';

    Object.assign(this, options);
  }

  jasmineStarted() {
    this.stats = new SpecStats();
  }

  jasmineDone(result) {
    this.stats.stopTimer();

    this.printer.writeLn('');

    if (this.stats.failedSpecs.length > 0) {
      this.printer.writeLn('Failures:');
      this.stats.failedSpecs.forEach(this.printSpecFailureDetails, this);
    }

    this.stats.failedSuites.forEach(this.printSuiteFailureDetails, this);
    this.printSuiteFailureDetails(result);

    if (this.stats.pendingSpecs.length > 0) {
      this.printer.writeLn('Pending:');
      this.stats.pendingSpecs.forEach(this.printPendingSpecDetails, this);
    }

    this.printTotal();
    this.printIncomplete(result);
  }

  specDone(result) {
    this.stats.specCount++;

    if (result.status === 'pending') {
      this.stats.pendingSpecs.push(result);
    } else if (result.status === 'failed') {
      this.stats.failedSpecs.push(result);
    }

    this.printSpecDone(result);
  }

  suiteDone(result) {
    if (result.failedExpectations && result.failedExpectations.length > 0) {
      this.stats.failedSuites.push(result);
    }
  }

  stackFilter(stack) {
    if (!this.jasmineCorePath) {
      return stack;
    }

    return (stack || '')
      .split('\n')
      .filter(line => line.indexOf(this.jasmineCorePath) === -1)
      .join('\n');
  }

  printSpecDone(result) {
    const statusData = STATUS_MAP[result.status];
    this.printer.write(statusData.char, { color: statusData.color });
  }

  printSpecFailureDetails(result, failedSpecNumber) {
    this.printer.writeLn(`${failedSpecNumber + 1}) ${result.fullName}`);
    this.printFailedExpectations(result);
    this.printer.writeLn('');
  }

  printSuiteFailureDetails(result) {
    const isResultEmpty = !result || !result.failedExpectations
      || result.failedExpectations.length < 1;
    if (isResultEmpty) {
      return;
    }

    this.printer.writeLn(`Suite error ${result.fullName}`);
    this.printFailedExpectations(result);
    this.printer.writeLn('');
  }

  printPendingSpecDetails(result, pendingSpecNumber) {
    this.printer.writeLn(`${pendingSpecNumber + 1}) ${result.fullName}`);
    const reason = result.pendingReason || 'No reason given';
    this.printer.writeLn(reason, { color: 'yellow', indent: 1 });
    this.printer.writeLn('');
  }

  printFailedExpectations(result) {
    result.failedExpectations.forEach((failed) => {
      this.printer.writeLn('  Message:');
      this.printer.writeLn(failed.message, { color: 'red', indent: 2 });
      this.printer.writeLn('  Stack:');
      this.printer.writeLn(this.stackFilter(failed.stack), { indent: 2 });
    });
  }

  printTotal() {
    const stats = this.stats;

    if (stats.specCount < 1) {
      this.printer.write('No specs found', { color: 'yellow' });
      return;
    }

    this.printer.write(`${stats.passedCount} passed`, { color: 'green' });

    if (stats.failedCount) {
      this.printer.write(', ');
      this.printer.write(`${stats.failedCount} failed`, { color: 'red' });
    }

    if (stats.pendingCount) {
      this.printer.write(', ');
      this.printer.write(`${stats.pendingCount} pending`, { color: 'yellow' });
    }

    this.printer.writeLn(` (${stats.elapsed})`);
  }

  printIncomplete(result) {
    if (result && result.overallStatus === 'incomplete') {
      this.printer.writeLn(`Incomplete: ${result.incompleteReason}`);
    }
  }
}

module.exports = DefaultReporter;
