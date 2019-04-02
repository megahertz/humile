'use strict';

const NoParse           = require('./NoParse');
const TranspilerManager = require('./TranspilerManager');
const TypescriptBabel   = require('./TypescriptBabel');
const TypescriptTsNode  = require('./TypescriptTsNode');

module.exports = createTranspilerManager;

module.exports = createTranspilerManager;

function createTranspilerManager({ noParse }) {
  const manager = new TranspilerManager();
  const noParseTranspiler = new NoParse(noParse);

  manager.addTranspiler(new TypescriptTsNode());
  manager.addTranspiler(new TypescriptBabel());
  manager.addTranspiler(noParseTranspiler);

  noParseTranspiler.tryInitialize();

  return manager;
}
