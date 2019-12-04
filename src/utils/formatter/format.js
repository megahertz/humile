'use strict';

const concordance = require('concordance');

module.exports = {
  format,
};

function format(data) {
  return concordance.format(data);
}
