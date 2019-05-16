'use strict';

const { describe, it, expect } = require('../../../index');
const color                    = require('../color');
const Printer                  = require('../Printer');

describe('Printer', () => {
  describe('write', () => {
    it('should write a single string', () => {
      const printer = createPrinter();
      printer.write('test');

      expect(printer.stream.content).toEqual('test');
    });

    it('should write color string', () => {
      const printer = createPrinter();
      printer.write('test', { color: 'red' });

      expect(printer.stream.content).toEqual(color.red + 'test' + color.unset);
    });

    it('should word wrap', () => {
      const printer = createPrinter();
      printer.write('9ch. line', { indent: 1, wordWrap: true, newLine: true });
      printer.write('9ch. line', { wordWrap: true });
      expect(printer.stream.content.split('\n')).toEqual([
        '  9ch.',
        '  line',
        '9ch. line',
      ]);
    });
  });

  describe('writeLn', () => {
    it('should write a single line', () => {
      const printer = createPrinter();
      printer.writeLn('test');

      expect(printer.stream.content).toEqual('test\n');
    });

    it('should write multiline with indent', () => {
      const printer = createPrinter();
      printer.writeLn('line1\nline2', { indent: 2 });

      expect(printer.stream.content.split('\n')).toEqual([
        '    line1',
        '    line2',
        '',
      ]);
    });
  });

  it('should write a batch of commands', () => {
    const printer = createPrinter();
    printer.batch([
      [{ text: '1', newLine: true }],
      { text: '2' },
      {},
    ]);

    expect(printer.stream.content.split('\n')).toEqual(['1', '2']);
  });
});

class StreamMock {
  constructor() {
    this.content = '';
    this.isTTY = true;
    this.columns = 10;
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
