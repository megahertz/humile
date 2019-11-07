'use strict';

module.exports = start;

/**
 * @param {Config} config
 * @param {FileFinder} fileFinder
 * @param {Humile} humile
 * @param {boolean} isRequiredAsLibrary
 */
function start({ config, fileFinder, humile, isRequiredAsLibrary }) {
  if (isRequiredAsLibrary) {
    setTimeout(10, () => humile.start([]));
  } else {
    humile.start(fileFinder.findAbsolute());
  }
}
