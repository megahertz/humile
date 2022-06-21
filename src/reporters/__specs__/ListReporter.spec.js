'use strict';

const { describe, it, expect } = require('../../index');

const ListReporter = require('../ListReporter');
const Printer = require('../utils/Printer');

describe('ListReporter', () => {
  it('should print spec execution progress', () => {
    const reporter = createReporter();
    reporter.suiteStarted({ description: 'test' });
    reporter.specDone(createSpecResult({ status: 'passed' }));
    reporter.specDone(createSpecResult({ status: 'failed' }));
    reporter.specDone(createSpecResult({ status: 'pending' }));

    expect(reporter.printer.stream.content.split('\n')).toEqual([
      '  test',
      '    ✓ description',
      '    ✕ description',
      '    ⌛ description',
      '',
    ]);
  });

  it('should print results', () => {
    const reporter = createReporter();
    reporter.suiteStarted({ description: 'test' });
    reporter.specDone(createSpecResult({ status: 'passed' }));
    reporter.jasmineDone({ });

    expect(reporter.printer.stream.content.split('\n')).toEqual([
      '  test',
      '    ✓ description',
      '',
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
  return new ListReporter({
    printer: new Printer({
      stream: new StreamMock(),
    }),
  });
}

function createSpecResult(data = {}) {
  return {
    status: 'passed',
    fullName: 'test',
    description: 'description',
    ...data,
  };
}
