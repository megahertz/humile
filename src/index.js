#!/usr/bin/env node

'use strict';

const path = require('path');
const Humile = require('./Humile');
const JasmineFacade = require('./jasmine/JasmineFacade');
const { createReporter } = require('./reporters');
const { getConfig } = require('./tools/config');
const FileFinder = require('./tools/FileFinder');
const createTranspilerManager = require('./transpilers');

module.exports = {
  Humile,
};

main();

function main() {
  const config = getConfig();

  const finder = new FileFinder(process.cwd());
  const files = finder.find(config.masks)
    .map(file => path.join(process.cwd(), file));

  const jasmineFacade = new JasmineFacade();
  jasmineFacade.setSpecFilter(config.filter);

  const humile = new Humile(config, jasmineFacade, createTranspilerManager({
    noParse: config.ignoreExt,
  }));

  humile.exportGlobals(module.exports);
  config.globals && humile.exportGlobals(global);

  humile.addReporter(createReporter(config.reporter, {
    showColors: process.stderr.isTTY,
    stream: process.stderr,
    style: config.style,
  }));

  if (require.main === module) {
    humile.start(files);
  } else {
    setTimeout(() => humile.start([]), 10);
  }
}
