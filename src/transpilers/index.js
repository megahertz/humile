'use strict';

const TranspilerManager = require('./TranspilerManager');
const TypescriptBabel   = require('./TypescriptBabel');
const TypescriptTsNode  = require('./TypescriptTsNode');

module.exports = createTranspilerManager;

function createTranspilerManager() {
  const tsBabel = new TypescriptBabel();
  const tsNode = new TypescriptTsNode();
  const manager = new TranspilerManager();

  manager.addTranspiler(tsBabel);
  manager.addTranspiler(tsNode);

  return manager;
}
