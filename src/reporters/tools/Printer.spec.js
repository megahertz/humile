'use strict';

const Printer = require('./Printer');

describe('Printer', () => {
  it('should write a single string', () => {
    const printer = createPrinter();
    printer.write('test');
    expect(printer.stream.content).toEqual('test');
  });

  it('should write a single line', () => {
    const printer = createPrinter();
    printer.writeLn('test');
    expect(printer.stream.content).toEqual('test\n');
  });

  it('should write multiline with indent', () => {
    const printer = createPrinter();
    printer.writeLn('line1\nline2', { indent: 2});
    expect(printer.stream.content.split('\n')).toEqual([
      '    line1',
      '    line2',
      '',
    ]);
  });

  it('should write color string', () => {
    const printer = createPrinter();
    printer.write('test', { color: 'red' });
    expect(printer.stream.content)
      .toEqual(printer.colors.red + 'test' + printer.colors.none);
  });
});

class StreamMock {
  constructor() {
    this.content = '';
    this.isTTY = true;
  }

  write(data) {
    this.content += data;
  }
}

function createPrinter() {
  return new Printer({
    stream: new StreamMock(),
  });
}
