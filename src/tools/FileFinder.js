'use strict';

module.exports = FileFinder;

function FileFinder(glob, rootDir) {
  this.glob = glob;
  this.rootDir = rootDir;
}

// noinspection JSAnnotator
FileFinder.prototype = {
  constructor: FileFinder,

  find(masks) {
    var rootDir = this.rootDir;
    var glob = this.glob;
    var paths = this.separateExcluded(masks);

    return paths
      .include.reduce(function (res, mask) {
        return res.concat(glob.sync(mask, {
          cwd: rootDir,
          ignore: paths.exclude,
        }));
      }, []);
  },

  separateExcluded(masks) {
    return masks.reduce(function (res, mask) {
      if (mask.substr(0, 1) === '!') {
        res.exclude.push(mask.substr(1));
      } else {
        res.include.push(mask);
      }

      return res;
    }, { include: [], exclude: [] });
  },
};
