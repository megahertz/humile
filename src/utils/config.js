'use strict';

const options = require('package-options');

module.exports = {
  getConfig,
};

function getConfig() {
  options.help(`
Usage: humile [Test path patterns]
Options:
  -r, --require     Load module that match the given string
  -p, --path        Tests path, default is current working directory
  -i, --ignore-ext  Ignore some extension. "--ignore-ext .css" with
                    "import styles from './styles.css" will result style to be
                    an empty object
  -G, --no-globals  Don't register global function like describe, expect etc
  -f, --filter      Filter specs to run only those that match the given string
  -R, --reporter    default, jasmine, list, mini
      --colors      Force turn on colors in spec output
      --no-colors   Force turn off colors in spec output
      
      --version     Show version
      --help        Show this help message
  `);

  return new Config(options);
}

class Config {
  /**
   * @param {packageOptions.PackageOptions} opts
   */
  constructor(opts) {
    /** @type {string | void} */
    this.filter = opts.filter;

    const colorSupport = process.stdout.isTTY;
    /** @type {boolean} */
    this.colors = opts.colors === undefined ? colorSupport : opts.colors;

    /** @type {boolean} */
    this.globals = opts.globals === undefined || opts.globals;

    /** @type {string[]} */
    this.ignoreExt = asArray(opts.ignoreExt);

    /** @type {string[]} */
    this.masks = opts._.length > 0 ? opts._ : [
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
      '!+(node_modules|dist)/**',
    ];

    /** @type {string} */
    this.path = opts.path || process.cwd();

    /** @type {string} */
    this.reporter = opts.reporter || 'default';

    /** @type {string[]} */
    this.require = asArray(opts.require);

    this.style = {
      diff: {
        actualColor: opts.get('style.diff.actualColor', 'red'),
        actualTextColor: opts.get('style.diff.actualTextColor', 'red'),
        actualSign: opts.get('style.diff.actualSign', '-'),
        disabled: opts.get('style.diff.disabled', false),
        expectedColor: opts.get('style.diff.expectedColor', 'green'),
        expectedTextColor: opts.get('style.diff.expectedTextColor', 'green'),
        expectedSign: opts.get('style.diff.expectedSign', '+'),
        expectedFirst: opts.get('style.diff.expectedFirst', false),
        maxDepth: opts.get('style.diff.maxDepth', 1),
      },
      code: {
        disabled: opts.get('style.code.disabled', false),
        numberOfLines: opts.get('style.code.numberOfLines', 3),
      },
    };
  }
}

/**
 * @param {any} value
 * @return {string[]}
 */
function asArray(value) {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    value = [value];
  }

  return value.filter(item => typeof item === 'string');
}
