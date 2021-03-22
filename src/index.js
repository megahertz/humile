#!/usr/bin/env node

'use strict';

const { runCommand } = require('./commands');
const Humile = require('./Humile');
const JasmineFacade = require('./jasmine/JasmineFacade');
const { createReporter } = require('./reporters');
const { getConfig } = require('./utils/config');
const FileFinder = require('./utils/FileFinder');
const createTranspilerManager = require('./transpilers');

module.exports.default = module.exports;

main();

function main() {
  runCommand(createContext());
}

function createContext() {
  const config = getConfig();

  const jasmineFacade = new JasmineFacade(config.jasmineOptions);
  jasmineFacade.setSpecFilter(config.filter);

  const humile = new Humile(config, jasmineFacade, createTranspilerManager({
    noParse: config.ignoreExt,
  }));

  humile.exportGlobals(module.exports);
  config.globals && humile.exportGlobals(global);

  humile.addReporter(createReporter(config.reporter, {
    projectPath: config.path,
    showColors: config.colors,
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
