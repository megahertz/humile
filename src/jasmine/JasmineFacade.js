'use strict';

const jasmineRequire = require('jasmine-core');

class JasmineFacade {
  constructor() {
    this.jasmine = jasmineRequire.core(jasmineRequire);

    /** @type {humile.Env} */
    this.env = this.jasmine.getEnv({ suppressLoadErrors: true });

    this.jasmineInterface = jasmineRequire.interface(this.jasmine, this.env);
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
}

module.exports = JasmineFacade;
