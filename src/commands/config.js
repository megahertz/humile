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

  // eslint-disable-next-line no-console
  console.info(cfg);
}
