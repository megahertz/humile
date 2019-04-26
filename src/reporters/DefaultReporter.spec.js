'use strict';

const DefaultReporter = require('./DefaultReporter');
const Printer         = require('./tools/Printer');

describe('DefaultReporter', () => {
  it('should print failed expectation', () => {
    const reporter = createReporter();
    reporter.printFailedExpectations({
      failedExpectations: [{
        message: 'test',
        stack: 'stack trace',
      }],
    });

    expect(reporter.printer.stream.content.split('\n')).toEqual([
      '  Message:',
      '    test',
      '  Stack:',
      '    stack trace',
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
  return new DefaultReporter({
    printer: new Printer({
      stream: new StreamMock(),
    }),
  });
}
