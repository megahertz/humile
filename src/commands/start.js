'use strict';

module.exports = start;

/**
 * @param {FileFinder} fileFinder
 * @param {Humile} humile
 * @param {boolean} isRequiredAsLibrary
 */
function start({ fileFinder, humile, isRequiredAsLibrary }) {
  if (isRequiredAsLibrary) {
    setTimeout(() => humile.start([]), 10);
  } else {
    humile.start(fileFinder.find());
  }
}
