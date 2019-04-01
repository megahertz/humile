'use strict';

class Options {
  /**
   * @param {{_: string[]} & Object<string, string | boolean>} [args]
   */
  constructor(args) {
    /** @type {string[]|void} */
    this.require = null;

    this.noGlobals = false;

    this.masks = [
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
      '!+(node_modules|dist)/**',
    ];

    this.load(args || {});
  }

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
  }
}

module.exports = Options;

function getStringArray(value) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    value = [value];
  }

  return value.filter(item => typeof item === 'string');
}
