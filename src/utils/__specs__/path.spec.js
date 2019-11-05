'use strict';

const pathUtils = require('../path');

describe('utils/path', () => {
  describe('shortenPath', () => {
    it('should return relative path', () => {
      expect(pathUtils.shortenPath('/project', '/project/src/index.js'))
        .toBe('src/index.js');
    });

    it('should return absolute path when more then 2 levels down', () => {
      expect(pathUtils.shortenPath('/project/pkgs/a/b/c', '/project/index.js'))
        .toBe('/project/index.js');
    });

    it('should return unchanged path when it isn`t absolute', () => {
      expect(pathUtils.shortenPath('/project', 'project/index.js'))
        .toBe('project/index.js');
    });
  });
});
