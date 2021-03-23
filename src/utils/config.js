'use strict';

const options = require('package-options');

module.exports = {
  getConfig,
};

function getConfig() {
  options.help(`
Usage: humile [Test path patterns]
General options:
  -f, --filter      Filter specs to run only those that match the given string
  -i, --ignore      Ignore patterns like node_modules
      --ignore-ext  Ignore some extension. "--ignore-ext .css" with
                    "import styles from './styles.css" will result style to be
                    an empty object
  -G, --no-globals  Don't register global function like describe, expect etc
  -p, --path        Tests path, default is current working directory
  -r, --require     Load module that match the given string
      --force-close Forcibly close when the latest spec executed
      
Appearance options:
      --colors      Force turn on colors in spec output 
      --no-colors   Force turn off colors in spec output
  -R, --reporter    default, jasmine, list, mini      
      
Misc options:    
      --show-config Show the current config object and exit
      --show-specs  Show a list of all found spec files and exit
       
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
    // General

    /** @type {boolean} */
    this.globals = opts.globals === undefined || opts.globals;

    /** @type {string | void} */
    this.filter = opts.filter;

    /** @type {string[]} */
    this.ignore = opts.ignore ? asMasks(opts.ignore) : [
      '**/node_modules/**',
      '**/dist/**',
    ];

    /** @type {string[]} */
    this.ignoreExt = asArray(opts.ignoreExt);

    const mask = opts._.concat(opts.mask).filter(a => a !== undefined);
    /** @type {string[]} */
    this.mask = mask.length > 0 ? asMasks(mask) : [
      '**/*{[sS]pec,[T]est}.[jt]s?(x)',
    ];

    /** @type {string} */
    this.path = opts.path || process.cwd();

    /** @type {string[]} */
    this.require = asArray(opts.require);

    this.jasmineOptions = {
      random: Boolean(opts.random),
    };

    /** @type {boolean} */
    this.forceClose = opts.forceClose === undefined || Boolean(opts.forceClose);

    // Appearance

    /** @type {NodeJS.WriteStream} */
    this.stream = process.stderr;

    const colorSupport = this.stream.isTTY;
    /** @type {boolean} */
    this.colors = opts.colors === undefined ? colorSupport : opts.colors;

    /** @type {string} */
    this.reporter = opts.reporter || 'default';

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
        maxDepth: opts.get('style.diff.maxDepth', 3),
      },
      code: {
        disabled: opts.get('style.code.disabled', false),
        numberOfLines: opts.get('style.code.numberOfLines', 3),
      },
      showPending: opts.get('style.showPending', false),
    };

    /** @type {number} */
    this.slowMetric = Number.parseInt(opts.slowMetric, 10) || 40;

    // Misc

    /** @type {string} */
    this.command = 'start';

    if (opts.showConfig) {
      this.command = 'config';
    }

    if (opts.showSpecs) {
      this.command = 'list';
    }
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

/**
 * @param {any} value
 * @return {string[]}
 */
function asMasks(value) {
  return asArray(value)
    .map((mask) => {
      if (mask.startsWith("'") && mask.endsWith("'")) {
        return mask.substring(1, mask.length - 1);
      }
      return mask;
    });
}
