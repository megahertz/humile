'use strict';

const { shortenPath } = require('./utils/path');

class Humile {
  /**
   * @param {Config} config
   * @param {JasmineFacade} jasmineFacade
   * @param {TranspilerManager} transpileManager
   */
  constructor(config, jasmineFacade, transpileManager) {
    this.hasErrors = false;

    /** @type {Config} */
    this.config = config;

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
    this.config.require.forEach(this.requireModule, this);
    files.forEach(this.requireSuite, this);
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
   * @param {string} module
   */
  requireSuite(module) {
    try {
      this.jasmine.beforeSuiteLoad(module);
      this.requireModule(module);
    } catch (e) {
      this.jasmine.addSuiteError(shortenPath(this.config.path, module), e);
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

        process.exitCode = isPassed ? 0 : 1;
      },
    });
  }
}

module.exports = Humile;
