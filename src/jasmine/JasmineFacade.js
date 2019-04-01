'use strict';

const jasmineRequire = require('jasmine-core');

class JasmineFacade {
  constructor() {
    this.jasmine = jasmineRequire.core(jasmineRequire);

    /** @type {humile.Env} */
    this.env = this.jasmine.getEnv({ suppressLoadErrors: true });

    this.jasmineInterface = jasmineRequire.interface(this.jasmine, this.env);
    this.registerAliases(this.jasmineInterface);
  }

  /**
   * @param {humile.CustomReporter} reporter
   */
  addReporter(reporter) {
    this.env.addReporter(reporter);
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
}

module.exports = JasmineFacade;
