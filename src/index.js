#!/usr/bin/env node

'use strict';

const glob                    = require('glob');
const path                    = require('path');
const util                    = require('util');
const Humile                  = require('./Humile');
const JasmineFacade           = require('./jasmine/JasmineFacade');
const Options                 = require('./Options');
const createReporter          = require('./reporters');
const FileFinder              = require('./tools/FileFinder');
const parseConsoleArgs        = require('./tools/parseConsoleArgs');
const createTranspilerManager = require('./transpilers');

module.exports = {
  Humile,
};

if (require.main === module) {
  main();
}

function main() {
  const options = new Options(parseConsoleArgs());

  const finder = new FileFinder(glob, process.cwd());
  const files = finder.find(options.masks)
    .map(file => path.join(process.cwd(), file));

  const reporter = createReporter(options.reporter, {
    stream: process.stderr,
    showColors: process.stdout.isTTY,
  });

  const jasmineFacade = new JasmineFacade();
  options.filter && jasmineFacade.setSpecFilter(options.filter);

  const humile = new Humile(options, jasmineFacade, createTranspilerManager({
    noParse: options.noParse,
  }));

  humile.exportGlobals(module.exports);
  !options.noGlobals && humile.exportGlobals(global);

  humile.addReporter(reporter);

  humile.start(files);
}
