'use strict';

module.exports = codeBuilder;

function codeBuilder({ style = {} } = {}) {
  const numberOfLines = style.numberOfLines || 3;
  const isDisabled = Boolean(style.disabled);

  return function build(code, lineNumber, position, indent = 0) {
    if (isDisabled || !Number.isInteger(lineNumber)) {
      return [];
    }

    const lines = code.split('\n');
    const displayedLines = [];

    const { counterSize, currentOffset, from, to } = getCodeBlockPosition(
      lineNumber,
      lines.length,
      numberOfLines
    );

    for (let i = from; i <= to; i++) {
      displayedLines.push(lines[i]);
    }

    return displayedLines.reduce((texts, line, i) => {
      const curLineNumber = i + from + 1;
      const isCurrent = i === currentOffset;
      let textBatch = { text: line, newLine: true };

      if (isCurrent && Number.isInteger(position)) {
        textBatch = [
          { text: line.substr(0, position - 1) },
          { text: line.substr(position - 1, 1), color: 'bgRed' },
          { text: line.substr(position), newLine: true },
        ];
      }

      return texts.concat([
        {
          color: isCurrent ? 'red' : undefined,
          indent,
          text: isCurrent ? '> ' : '  ',
        },
        { text: curLineNumber.toString().padStart(counterSize), color: 'gray' },
        { text: ' │ ', color: 'gray' },
        textBatch,
      ]);
    }, []);
  };
}

function getCodeBlockPosition(lineNumber, numberOfLines, blockSize) {
  let from = Math.max(0, lineNumber - 1 - Math.floor(blockSize / 2));
  from = Math.min(from, numberOfLines - blockSize);

  const to = Math.min(from + blockSize - 1, numberOfLines - 1);
  const currentOffset = lineNumber - 1 - from;
  const counterSize = (to + 1).toString().length;

  return { counterSize, currentOffset, from, to };
}
