#!/usr/bin/env node

'use strict';

const { runCommand } = require('./commands');
const Humile = require('./Humile');
const JasmineFacade = require('./jasmine/JasmineFacade');
const { createReporter } = require('./reporters');
const { getConfig } = require('./utils/config');
const FileFinder = require('./utils/FileFinder');
const createTranspilerManager = require('./transpilers');

const context = createContext();
const api = context.humile.jasmine.jasmineInterface;

// Static assignments, so Node can detect named exports for ESM imports
exports.default = exports;
exports.humile = context.humile;
exports.after = api.after;
exports.afterAll = api.afterAll;
exports.afterEach = api.afterEach;
exports.before = api.before;
exports.beforeAll = api.beforeAll;
exports.beforeEach = api.beforeEach;
exports.describe = api.describe;
exports.expect = api.expect;
exports.expectAsync = api.expectAsync;
exports.fail = api.fail;
exports.fdescribe = api.fdescribe;
exports.fit = api.fit;
exports.it = api.it;
exports.jasmine = api.jasmine;
exports.jsApiReporter = api.jsApiReporter;
exports.pending = api.pending;
exports.setSpecProperty = api.setSpecProperty;
exports.setSuiteProperty = api.setSuiteProperty;
exports.spyOn = api.spyOn;
exports.spyOnAllFunctions = api.spyOnAllFunctions;
exports.spyOnProperty = api.spyOnProperty;
exports.test = api.test;
exports.xdescribe = api.xdescribe;
exports.xit = api.xit;

// Deferred, so ESM specs can require(esm) this module without a cycle
setImmediate(() => runCommand(context));

function createContext() {
  const config = getConfig();

  const jasmineFacade = new JasmineFacade(config.jasmineOptions);
  jasmineFacade.setSpecFilter(config.filter);

  const humile = new Humile(config, jasmineFacade, createTranspilerManager({
    noParse: config.ignoreExt,
    transpiler: config.transpiler,
  }));

  config.globals && humile.exportGlobals(global);

  humile.addReporter(createReporter(config.reporter, {
    projectPath: config.path,
    showColors: config.colors,
    slowMetric: config.slowMetric,
    stream: config.stream,
    style: config.style,
  }));

  return {
    config,
    fileFinder: new FileFinder(config.path, config.mask, config.ignore),
    humile,
    isRequiredAsLibrary: require.main !== module,
  };
}
