'use strict';

const jasmineRequire = require('jasmine-core');
const { registerMatchers } = require('./matchers');
const MatcherHelper = require('./matchers/MatcherHelper');
const SpecFilter = require('./SpecFilter');

class JasmineFacade {
  constructor(jasmineOptions) {
    this.jasmine = jasmineRequire.core(jasmineRequire);

    /** @type {jasmine.Env} */
    this.env = this.jasmine.getEnv({ suppressLoadErrors: true });
    this.env.configure({
      ...jasmineOptions,
      specFilter: this.specFilterCallback.bind(this),
    });

    this.jasmineInterface = jasmineRequire.interface(this.jasmine, this.env);

    /** @type {SpecFilter} */
    this.specFilter = null;
    this.matcherHelper = new MatcherHelper(this.env);

    this.registerAliases(this.jasmineInterface);
    registerMatchers(this.matcherHelper);
  }

  /**
   * @param {humile.CustomReporter} reporter
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
    jasmineInterface.after  = jasmineInterface.afterAll;
    jasmineInterface.test   = jasmineInterface.it;
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
}

module.exports = JasmineFacade;
