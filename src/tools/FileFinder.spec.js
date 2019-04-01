'use strict';

const glob       = require('glob');
const FileFinder = require('./FileFinder');

describe('FileFinder', () => {
  it('should find all specs in tools folder', () => {
    const finder = new FileFinder(glob, __dirname);

    expect(finder.find(['**/*.spec.js'])).toEqual([
      'FileFinder.spec.js',
      'parseConsoleArgs.spec.js',
    ]);
  });
});
