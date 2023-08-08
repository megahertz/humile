'use strict';

const NoParse = require('./NoParse');
const TypescriptBabel = require('./TypescriptBabel');
const TypescriptEsbuild = require('./TypescriptEsbuild');
const TranspilerManager = require('./TranspilerManager');
const TypescriptSwc = require('./TypescriptSwc');
const TypescriptTsNode = require('./TypescriptTsNode');

module.exports = createTranspilerManager;

function createTranspilerManager({ noParse }) {
  const manager = new TranspilerManager();
  const noParseTranspiler = new NoParse(noParse);

  manager.addTranspiler(new TypescriptSwc());
  manager.addTranspiler(new TypescriptEsbuild());
  manager.addTranspiler(new TypescriptTsNode());
  manager.addTranspiler(new TypescriptBabel());
  manager.addTranspiler(noParseTranspiler);

  noParseTranspiler.tryInitialize();

  return manager;
}
