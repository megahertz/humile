'use strict';

module.exports = config;

/**
 * @param {FileFinder} fileFinder
 * @param {boolean} isRequiredAsLibrary
 */
function config({ fileFinder, isRequiredAsLibrary }) {
  if (isRequiredAsLibrary) {
    return;
  }

  fileFinder.find().forEach(file => console.info(file));
}
