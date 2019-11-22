'use strict';

const jasmineRequire = require('jasmine-core');
const SpecFilter = require('./SpecFilter');

class JasmineFacade {
  constructor(jasmineOptions) {
    this.jasmine = jasmineRequire.core(jasmineRequire);

    /** @type {humile.Env} */
    this.env = this.jasmine.getEnv({ suppressLoadErrors: true });

    this.env.configure(jasmineOptions);

    this.jasmineInterface = jasmineRequire.interface(this.jasmine, this.env);
    this.registerAliases(this.jasmineInterface);
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
   * Set regexp string as a spec filter.
   * @param {string} filter
   * @returns {void}
   */
  setSpecFilter(filter) {
    if (!filter) {
      return;
    }

    const specFilter = new SpecFilter(filter);

    this.env.configure({
      specFilter(spec) {
        return specFilter.test(spec.getFullName());
      },
    });
  }
}

module.exports = JasmineFacade;
