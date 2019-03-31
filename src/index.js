#!/usr/bin/env node

'use strict';

var glob               = require('glob');
var path               = require('path');
var util               = require('util');
var Humile             = require('./Humile');
var JasmineFacade      = require('./jasmine/JasmineFacade');
var Options            = require('./Options');
var ConsoleReporter    = require('./reporters/ConsoleReporter');
var FileFinder         = require('./tools/FileFinder');
var parseConsoleArgs   = require('./tools/parseConsoleArgs');


module.exports = {
  Humile: Humile,
};

if (require.main === module) {
  main();
}

function main() {
  var options = new Options(parseConsoleArgs());

  var finder = new FileFinder(glob, process.cwd());
  var files = finder.find(options.masks)
    .map(function (file) { return path.join(process.cwd(), file) });

  var reporter = new ConsoleReporter();
  reporter.setOptions({
    print: print,
    showColors: process.stdout.isTTY,
  });

  var jasmineFacade = new JasmineFacade();

  var humile = new Humile(options, jasmineFacade);
  humile.exportGlobals(module.exports);
  !options.noGlobals && humile.exportGlobals(global);
  humile.addReporter(reporter);
  humile.start(files);
}

function print() {
  process.stdout.write(util.format.apply(this, arguments));
}
