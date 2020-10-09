'use strict';

const { EventEmitter } = require('events');
const { shortenPath } = require('./utils/path');

/**
 * @typedef { import('@types/jasmine') } jasmine
 */

class Humile extends EventEmitter {
  /**
   * @param {Config} config
   * @param {JasmineFacade} jasmineFacade
   * @param {TranspilerManager} transpileManager
   */
  constructor(config, jasmineFacade, transpileManager) {
    super();

    this.hasErrors = false;

    /** @type {Config} */
    this.config = config;

    /** @type {JasmineFacade} */
    this.jasmine = jasmineFacade;

    /** @type {TranspilerManager} */
    this.transpileManager = transpileManager;

    /**
     * @type {object}
     */
    this.currentSpec = null;
  }

  /**
   * @param {jasmine.CustomReporter} reporter
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
    object.humile = this;
    return this.jasmine.exportGlobals(object);
  }

  start(files) {
    this.config.require.forEach(this.requireModule, this);
    files.forEach(this.requireSuite, this);
    this.subscribeToJasmineEvents();
    this.jasmine.execute();
  }

  /**
   * @param {string} module
   * @private
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
   * @param {string} module
   * @private
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
    const humile = this;

    // noinspection JSAnnotator
    this.addReporter({
      specStarted(result) {
        humile.currentSpec = result;
        humile.emit('spec', result);
      },

      specDone(result) {
        humile.emit('spec-done', result);
        humile.currentSpec = null;
      },

      suiteStarted(result) {
        humile.emit('suite', result);
      },

      suiteDone(result) {
        humile.emit('suite-done', result);
      },

      jasmineStarted(result) {
        humile.emit('start', result);
      },

      jasmineDone(result) {
        humile.emit('done', result);

        let isPassed = result.overallStatus === 'passed' && !humile.hasErrors;

        if (!isPassed && result.incompleteReason === 'No specs found') {
          isPassed = true;
        }

        process.exitCode = isPassed ? 0 : 1;
      },
    });
  }
}

module.exports = Humile;
