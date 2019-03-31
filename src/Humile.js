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
    files.forEach(this.requireFile, this);
    this.subscribeToJasmineEvents();
    this.jasmine.execute();
  },

  /**
   * @private
   * @param {string} file
   */
  requireFile(file) {
    try {
      require(file);
    } catch (e) {
      this.hasErrors = true;
      console.warn('Cannot load spec ' + e.stack || e.message);
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
