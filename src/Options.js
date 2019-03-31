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
  masks: undefined,
  require: undefined,
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
    this.require = args.require || args.r;

    // noinspection JSUnresolvedVariable
    this.noGlobals = args.noglobals || args.G;
  },
};
