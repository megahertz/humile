'use strict';

const options = require('package-options');
const { isCommandExists } = require('../commands');

module.exports = {
  getConfig,
};

function getConfig() {
  options.help(`
Usage: humile [Command] [Test path patterns]
Options:
      --colors      Force turn on colors in spec output
  -f, --filter      Filter specs to run only those that match the given string
  -i, --ignore      Ignore patterns like node_modules
      --ignore-ext  Ignore some extension. "--ignore-ext .css" with
                    "import styles from './styles.css" will result style to be
                    an empty object
      --no-colors   Force turn off colors in spec output
  -G, --no-globals  Don't register global function like describe, expect etc
  -p, --path        Tests path, default is current working directory
  -R, --reporter    default, jasmine, list, mini
  -r, --require     Load module that match the given string
      
      --version     Show version
      --help        Show this help message
      
Commands:
  config  Show the current config
  list    Show found spec files
  `);

  return new Config(options);
}

class Config {
  /**
   * @param {packageOptions.PackageOptions} opts
   */
  constructor(opts) {
    const args = opts._.slice();

    if (isCommandExists(opts._[0])) {
      args.shift();
      /** @type {string} */
      this.command = opts._[0];
    } else {
      this.command = 'start';
    }

    const colorSupport = process.stdout.isTTY;
    /** @type {boolean} */
    this.colors = opts.colors === undefined ? colorSupport : opts.colors;

    /** @type {string | void} */
    this.filter = opts.filter;

    /** @type {boolean} */
    this.globals = opts.globals === undefined || opts.globals;

    /** @type {string[]} */
    this.ignore = opts.ignore ? asArray(opts.ignore) : [
      '+(node_modules|dist)/**',
    ];

    /** @type {string[]} */
    this.ignoreExt = asArray(opts.ignoreExt);

    const mask = args.concat(opts.mask).filter(a => a !== undefined);
    /** @type {string[]} */
    this.mask = mask.length > 0 ? asArray(mask) : [
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
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
