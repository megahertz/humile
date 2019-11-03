'use strict';

const glob = require('glob');

class FileFinder {
  /**
   * @param {string} rootDir
   */
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  find(masks) {
    const rootDir = this.rootDir;
    const paths = this.separateExcluded(masks);

    return paths
      .include.reduce((res, mask) => {
        return res.concat(glob.sync(mask, {
          cwd: rootDir,
          ignore: paths.exclude,
        }));
      }, []);
  }

  separateExcluded(masks) {
    return masks.reduce((res, mask) => {
      if (mask.substr(0, 1) === '!') {
        res.exclude.push(mask.substr(1));
      } else {
        res.include.push(mask);
      }

      return res;
    }, { include: [], exclude: [] });
  }
}

module.exports = FileFinder;
