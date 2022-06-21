'use strict';

const jasmineRequire = require('jasmine-core');
const { registerMatchers } = require('./matchers');
const MatcherHelper = require('./matchers/MatcherHelper');
const SpecFilter = require('./SpecFilter');

/**
 * @typedef { import('@types/jasmine') } jasmine
 */

class JasmineFacade {
  constructor(jasmineOptions) {
    this.jasmine = jasmineRequire.core(jasmineRequire);
    this.patchSpecConstructor(this.jasmine);

    /** @type {jasmine.Env} */
    this.env = this.jasmine.getEnv({ suppressLoadErrors: true });
    this.env.configure({
      ...jasmineOptions,
      specFilter: this.specFilterCallback.bind(this),
    });

    this.jasmineInterface = jasmineRequire.interface(this.jasmine, this.env);

    /** @type {SpecFilter} */
    this.specFilter = null;
    this.matcherHelper = new MatcherHelper(this.jasmine, this.env);

    this.registerAliases(this.jasmineInterface);
    registerMatchers(this.matcherHelper);

    /** @type {string | null} */
    this.processingSuiteFilePath = null;
  }

  /**
   * @param {jasmine.CustomReporter} reporter
   */
  addReporter(reporter) {
    this.env.addReporter(reporter);
  }

  /**
   * @param {string} suiteName
   * @param {error} error
   */
  addSuiteError(suiteName, error) {
    this.env.describe(suiteName, () => {
      this.env.it('test suite failed to run', () => {
        throw error;
      });
    });
  }

  execute() {
    this.env.execute();
  }

  exportGlobals(object) {
    return Object.assign(object, this.jasmineInterface);
  }

  registerAliases(jasmineInterface) {
    jasmineInterface.before = jasmineInterface.beforeAll;
    jasmineInterface.after = jasmineInterface.afterAll;
    jasmineInterface.test = jasmineInterface.it;
  }

  /**
   * @private
   */
  specFilterCallback(spec) {
    this.matcherHelper.addSpec(spec);
    return this.specFilter ? this.specFilter.test(spec.getFullName()) : true;
  }

  /**
   * Set regexp string as a spec filter.
   * @param {string} filter
   * @returns {void}
   */
  setSpecFilter(filter) {
    this.specFilter = new SpecFilter(filter);
  }

  /**
   * @param {string} specFilePath
   */
  beforeSuiteLoad(specFilePath) {
    this.processingSuiteFilePath = specFilePath;
  }

  /**
   * @param {object} jasmine
   * @private
   */
  patchSpecConstructor(jasmine) {
    const OriginalSpec = jasmine.Spec;
    const jasmineFacade = this;

    jasmine.Spec = function HumileSpec(...args) {
      OriginalSpec.apply(this, args);
      this.result.filePath = jasmineFacade.processingSuiteFilePath;
    };

    jasmine.Spec.prototype = OriginalSpec.prototype;
  }
}

module.exports = JasmineFacade;
