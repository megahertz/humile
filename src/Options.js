'use strict';

module.exports = Options;

/**
 * Options holder
 * @param {{_: string[]} & Object<string, string | boolean>} [args]
 * @constructor
 */
function Options(args) {
  this.masks = [
    '**/*{[sS]pec,[T]est}.[jt]s?(x)',
    '!+(node_modules|dist)/**',
  ];

  this.load(args || {});
}

// noinspection JSAnnotator
Options.prototype = {
  /** @type {string[]} */
  masks: null,

  /** @type {string[]|void} */
  require: null,

  noGlobals: false,

  constructor: Options,

  /**
   * Load options from args object
   * @param {{_: string[]} & Object<string, string | boolean>} args
   */
  load(args) {
    if (args._ && args._.length > 0) {
      this.masks = args._;
    }

    // noinspection JSUnresolvedVariable
    this.require = getStringArray(args.require || args.r);

    // noinspection JSUnresolvedVariable
    this.noGlobals = args.noglobals || args.G;
  },
};

function getStringArray(value) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    value = [value];
  }

  return value.filter(function (item) { return typeof item === 'string' });
}
