'use strict';

const FileFinder = require('../FileFinder');

describe('FileFinder', () => {
  it('should find all specs in tools folder', () => {
    const finder = new FileFinder(__dirname);

    expect(finder.find(['**/*.spec.js'])).toEqual([
      'FileFinder.spec.js',
    ]);
  });
});
