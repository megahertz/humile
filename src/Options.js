'use strict';

class Options {
  /**
   * @param {{_: string[]} & Object<string, string | boolean>} [args]
   */
  constructor(args) {
    this.filter = '';

    /** @type {string[]} */
    this.masks = [
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
      '!+(node_modules|dist)/**',
    ];

    this.noGlobals = false;

    /** @type {string[]} */
    this.noParse = [];

    this.reporter = 'default';

    /** @type {string[]|void} */
    this.require = null;

    this.load(args || {});
  }

  /**
   * Load options from args object
   * @param {{_: string[]} & Object<string, string | boolean>} args
   */
  load(args) {
    // noinspection JSUnresolvedVariable
    this.filter = args.filter || args.f;

    if (args._ && args._.length > 0) {
      this.masks = args._;
    }

    // noinspection JSUnresolvedVariable
    this.noGlobals = args.noglobals || args.G;

    // noinspection JSUnresolvedVariable
    this.noParse = getStringArray(args.noparse || args.P);

    // noinspection JSUnresolvedVariable
    this.reporter = args.reporter || 'default';

    // noinspection JSUnresolvedVariable
    this.require = getStringArray(args.require || args.r);
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
