'use strict';

module.exports = color;

color.unset = '\x1b[0m';
color.black = '\x1b[30m';
color.red = '\x1b[31m';
color.green = '\x1b[32m';
color.yellow = '\x1b[33m';
color.blue = '\x1b[34m';
color.magenta = '\x1b[35m';
color.cyan = '\x1b[36m';
color.white = '\x1b[37m';
color.gray = '\x1b[90m';

color.bgRed = '\x1b[41m' + color.black;
color.bgGreen = '\x1b[42m' + color.black;


function color(name, text) {
  if (typeof color[name] !== 'string') {
    return text;
  }

  return color[name] + text + color.unset;
}
