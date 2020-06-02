'use strict';

const Stack = require('./Stack');
const StackItem = require('./StackItem');

module.exports = {
  parseStack,
};

/**
 * @param {string} text
 * @return {Stack}
 */
function parseStack(text) {
  const { error, items } = splitStackText(text);

  const errorText = error.trim().replace(/^Error:/, '').trim();
  const parsedItems = items.map(item => new StackItem(parseItem(item)));

  return new Stack(errorText, parsedItems);
}

function splitStackText(text) {
  const lines = (text || '').split('\n');

  return lines.reduce((result, line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('at ')) {
      result.items.push(trimmed.substr(3));
    } else {
      result.error += line;
    }

    return result;
  }, { error: '', items: [] });
}

function parseItem(text) {
  const [context, ...sourceParts] = text.split(' (', 2);

  let windowsPrefix;
  if (sourceParts[0] && sourceParts[0][1] === ':') {
    windowsPrefix = sourceParts[0].slice(0, 2);
    sourceParts[0] = sourceParts[0].slice(2);
  }

  let [source, line, position] = sourceParts.join(' ')
    .replace(/\)$/, '')
    .split(':');

  if (windowsPrefix) {
    source = windowsPrefix + source;
  }

  source = source.trim() || null;
  line = parseInt(line, 10);
  position = parseInt(position, 10);

  return {
    context,
    source,
    line: Number.isNaN(line) ? null : line,
    position: Number.isNaN(position) ? null : position,
  };
}
