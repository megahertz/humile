'use strict';

module.exports = Humile;

function Humile(options, jasmineFacade) {
  this.options = options;
  this.jasmine = jasmineFacade;
}

// noinspection JSAnnotator
Humile.prototype = {
  hasErrors: false,

  /** @type {JasmineFacade} */
  jasmine: undefined,

  /** @type {Options} */
  options: undefined,

  constructor: Humile,

  /**
   * @param {jasmine.CustomReporter} reporter
   */
  addReporter(reporter) {
    this.jasmine.addReporter(reporter);
  },

  /**
   * Register jasmine members in a given object
   * @param {object} object
   * @returns {object}
   */
  exportGlobals(object) {
    return this.jasmine.exportGlobals(object);
  },

  start(files) {
    this.options.require.forEach(this.requireModule, this);
    files.forEach(this.requireModule, this);
    this.subscribeToJasmineEvents();
    this.jasmine.execute();
  },

  /**
   * @private
   * @param {string} module
   */
  requireModule(module) {
    try {
      require(module);
    } catch (e) {
      this.hasErrors = true;
      throw e;
    }
  },

  /**
   * @private
   */
  subscribeToJasmineEvents() {
    var self = this;

    // noinspection JSAnnotator
    this.addReporter({
      jasmineDone(result) {
        var isPassed = result.overallStatus === 'passed' && !self.hasErrors;
        process.exit(isPassed ? 0 : 1);
      },
    });
  },
};
