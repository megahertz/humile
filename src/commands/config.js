'use strict';

module.exports = config;

/**
 * @param {Config} config
 * @param {boolean} isRequiredAsLibrary
 */
function config({ config: cfg, isRequiredAsLibrary }) {
  if (isRequiredAsLibrary) {
    return;
  }

  console.info(cfg);
}
