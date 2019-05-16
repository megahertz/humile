'use strict';

const { describe, it, expect } = require('../../index');

const MiniReporter = require('../MiniReporter');
const Printer         = require('../tools/Printer');

describe('MiniReporter', () => {
  it('should print spec execution progress', () => {
    const reporter = createReporter();
    reporter.specDone({ status: 'passed' });
    reporter.specDone({ status: 'failed' });
    reporter.specDone({ status: 'pending' });

    expect(reporter.printer.stream.content).toEqual('');
  });

  it('should print results', () => {
    const reporter = createReporter();
    reporter.specDone({ status: 'passed' });
    reporter.jasmineDone({ });

    expect(reporter.printer.stream.content.split('\n')).toEqual([
      jasmine.stringMatching(/1 passed \(\d+ms\)/),
      '',
    ]);
  });
});

class StreamMock {
  constructor() {
    this.content = '';
  }

  write(data) {
    this.content += data;
  }
}

function createReporter() {
  return new MiniReporter({
    printer: new Printer({
      stream: new StreamMock(),
    }),
  });
}
