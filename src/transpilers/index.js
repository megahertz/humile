'use strict';

const NoParse           = require('./NoParse');
const TranspilerManager = require('./TranspilerManager');
const TypescriptBabel   = require('./TypescriptBabel');
const TypescriptTsNode  = require('./TypescriptTsNode');

module.exports = createTranspilerManager;

function createTranspilerManager({ noParse }) {
  const manager = new TranspilerManager();

  manager.addTranspiler(new TypescriptTsNode());
  manager.addTranspiler(new TypescriptBabel());
  manager.addTranspiler(new NoParse(noParse));

  return manager;
}
