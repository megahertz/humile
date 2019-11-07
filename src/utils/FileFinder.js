'use strict';

const glob = require('glob');
const path = require('path');

class FileFinder {
  /**
   * @param {string} rootDir
   * @param {string[]} includeMask
   * @param {string[]} excludeMask
   */
  constructor(rootDir, includeMask, excludeMask = []) {
    this.rootDir = rootDir;

    const masks = this.normalizeMasks(includeMask, excludeMask);

    this.includeMask = masks.include;
    this.excludeMask = masks.exclude;
  }

  find() {
    return this.includeMask
      .reduce((res, mask) => {
        return res.concat(glob.sync(mask, {
          cwd: this.rootDir,
          ignore: this.excludeMask,
        }));
      }, []);
  }

  findAbsolute() {
    return this.find()
      .map(file => path.join(this.rootDir, file));
  }

  /**
   * @param {string[]} includeMask
   * @param {string[]} excludeMask
   * @return {{ include: string[], exclude: string[] }}
   */
  normalizeMasks(includeMask, excludeMask) {
    return includeMask.reduce((res, mask) => {
      if (mask.substr(0, 1) === '!') {
        res.exclude.push(mask.substr(1));
      } else {
        res.include.push(mask);
      }

      return res;
    }, { include: [], exclude: excludeMask });
  }
}

module.exports = FileFinder;
