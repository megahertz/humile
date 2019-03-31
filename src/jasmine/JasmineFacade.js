'use strict';

var jasmineRequire = require('jasmine-core');

module.exports = JasmineFacade;

function JasmineFacade() {
  this.jasmine = jasmineRequire.core(jasmineRequire);
  this.env = this.jasmine.getEnv({ suppressLoadErrors: true });
  this.jasmineInterface = jasmineRequire.interface(this.jasmine, this.env);
}

// noinspection JSAnnotator
JasmineFacade.prototype = {
  /** @type {jasmine.Env} */
  env: undefined,
  jasmine: undefined,
  jasmineInterface: undefined,

  constructor: JasmineFacade,

  /**
   * @param {jasmine.CustomReporter} reporter
   */
  addReporter(reporter) {
    this.env.addReporter(reporter);
  },

  execute() {
    this.env.execute();
  },

  exportGlobals(object) {
    var src = this.jasmineInterface;

    for (var property in src) {
      if (!src.hasOwnProperty(property)) continue;
      object[property] = src[property];
    }

    return object;
  },
};
