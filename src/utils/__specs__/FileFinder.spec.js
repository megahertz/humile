'use strict';

const path = require('path');
const FileFinder = require('../FileFinder');

describe('FileFinder', () => {
  it('should find all specs in utils folder', () => {
    const finder = new FileFinder(__dirname, ['**/*.spec.js']);

    expect(finder.find([]).map(f => path.basename(f))).toEqual([
      'FileFinder.spec.js',
      'path.spec.js',
    ]);
  });

  it('should find all specs in utils folder by specifying dir as mask', () => {
    const finder = new FileFinder(__dirname, ['.']);

    expect(finder.find([]).map(f => path.basename(f))).toEqual([
      'FileFinder.spec.js',
      'path.spec.js',
    ]);
  });
});
