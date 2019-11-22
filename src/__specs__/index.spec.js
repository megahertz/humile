const { describe, expect, it } = require('..');
const index = require('../index');

describe('index', () => {
  it('should export standard jasmine functions', () => {
    expect(index.describe).toBeDefined();
  });
});
