'use strict';


module.exports = parseConsoleArgs;

/**
 * Transform process.argv to key-value object
 * @param {string[]} [argv]
 * @return {{_: string[]} & Object<string, string | boolean>}
 */
function parseConsoleArgs(argv) {
  argv = Array.isArray(argv) ? argv : process.argv.slice(2);

  var key;
  return argv.reduce(function (res, arg) {
    if (arg.indexOf('-') === 0) {
      key = arg.replace(/^-+/, '');

      if (key.indexOf('=') > 0) {
        var pair = key.split('=', 2).map(function (s) { return s.trim() });
        key = null;
        res[pair[0]] = pair[1];
        return res;
      }

      res[key] = true;
      return res;
    }

    if (key) {
      res[key] = arg.trim();
      key = null;
    } else {
      res._.push(arg.trim());
    }

    return res;
  }, { _: [] });
}
