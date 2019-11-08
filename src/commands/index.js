'use strict';

const config = require('./config');
const list = require('./list');
const start = require('./start');

module.exports = {
  runCommand,
};

const COMMANDS = {
  config,
  list,
  start,
};

function runCommand(context) {
  const commandName = context.config.command;
  const command = COMMANDS[commandName];

  command(context);
}
