'use strict';

class Humile {
  /**
   * @param {Options} options
   * @param {JasmineFacade} jasmineFacade
   */
  constructor(options, jasmineFacade, transpileManager) {
    this.hasErrors = false;

    /** @type {Options} */
    this.options = options;

    /** @type {JasmineFacade} */
    this.jasmine = jasmineFacade;

    /** @type {TranspilerManager} */
    this.transpileManager = transpileManager;
  }

  /**
   * @param {humile.CustomReporter} reporter
   */
  addReporter(reporter) {
    this.jasmine.addReporter(reporter);
  }

  /**
   * Register jasmine members in a given object
   * @param {object} object
   * @returns {object}
   */
  exportGlobals(object) {
    return this.jasmine.exportGlobals(object);
  }

  start(files) {
    this.options.require.forEach(this.requireModule, this);
    files.forEach(this.requireModule, this);
    this.subscribeToJasmineEvents();
    this.jasmine.execute();
  }

  /**
   * @private
   * @param {string} module
   */
  requireModule(module) {
    this.transpileManager.checkTranspiler(module);

    try {
      // eslint-disable-next-line
      require(module);
    } catch (e) {
      this.hasErrors = true;
      throw e;
    }
  }

  /**
   * @private
   */
  subscribeToJasmineEvents() {
    // noinspection JSAnnotator
    this.addReporter({
      jasmineDone: (result) => {
        let isPassed = result.overallStatus === 'passed' && !this.hasErrors;

        if (!isPassed && result.incompleteReason === 'No specs found') {
          isPassed = true;
        }

        process.exit(isPassed ? 0 : 1);
      },
    });
  }
}

module.exports = Humile;
