'use strict';

/**
 * A bridge between custom matchers and jasmine internals
 */
class MatcherHelper {
  /**
   * @param {jasmine} jasmine
   * @param {jasmine.Env} env
   */
  constructor(jasmine, env) {
    /**
     * @type {jasmine}
     */
    this.jasmine = jasmine;

    /**
     * @type {jasmine.Env}
     */
    this.env = env;
    /**
     * @type {jasmine.CustomReporterResult}
     * @private
     */
    this.currentSpecResult = null;

    /**
     * @type {jasmine.Spec[]}
     * @private
     */
    this.specs = [];

    /**
     * @type {Object<string, number>}
     * @private
     */
    this.expectations = {};

    this.env.addReporter({
      specStarted: (result) => {
        this.currentSpecResult = result;
      },
    });
  }

  /**
   * Add custom information to the current spec result
   * @param {string} id
   * @param {any} value
   */
  addSpecResultMeta(id, value) {
    const spec = this.getCurrentSpec();
    if (!spec || !spec.result) {
      return;
    }

    const specResult = spec.result;
    if (!specResult.meta) {
      specResult.meta = {};
    }

    specResult.meta[id] = value;
  }

  /**
   * Return id of the current expectation
   * @return {string}
   */
  makeExpectationId() {
    const specName = this.getCurrentSpecName();

    if (!specName) {
      throw new Error('Can\'t detect the current spec');
    }

    if (!this.expectations[specName]) {
      this.expectations[specName] = 1;
      return specName;
    }

    this.expectations[specName] += 1;
    return `${specName} #${this.expectations[specName]}`;
  }

  /**
   * @param {jasmine.Spec} spec
   * @package
   */
  addSpec(spec) {
    this.specs.push(spec);
  }

  /**
   * @param {jasmine.CustomMatcherFactories} matchers
   * @package
   */
  registerMatchers(matchers) {
    this.env.beforeEach(() => {
      this.env.addMatchers(matchers);
    });
  }

  /**
   * @return {jasmine.Spec | null}
   * @private
   */
  getCurrentSpec() {
    if (!this.currentSpecResult) {
      return null;
    }

    return this.specs.find(spec => spec.id === this.currentSpecResult.id);
  }

  /**
   * @return {string | null}
   * @private
   */
  getCurrentSpecName() {
    const spec = this.getCurrentSpecResult();
    return spec ? spec.fullName : null;
  }

  /**
   * @return {jasmine.CustomReporterResult | null}
   * @private
   */
  getCurrentSpecResult() {
    return this.currentSpecResult;
  }
}

module.exports = MatcherHelper;
