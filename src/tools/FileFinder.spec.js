'use strict';

var glob       = require('glob');
var FileFinder = require('./FileFinder');

describe('FileFinder', function () {
  it('should find all specs in tools folder', function () {
    var finder = new FileFinder(glob, __dirname);

    expect(finder.find(['**/*.spec.js'])).toEqual([
      'FileFinder.spec.js',
      'parseConsoleArgs.spec.js',
    ]);
  });
});
