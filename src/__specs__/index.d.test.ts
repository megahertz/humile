import humile, { describe, expect, it } from '../index';

humile.describe('default export', () => {
  humile.it('spec', () => {
    humile.expect(true).toBe(true);
  });
});

describe('named export', () => {
  it('spec', () => {
    expect(true).toBe(true);
  });
});

describe('custom matchers', () => {
  it('should contain toMatchSnapshot', () => {
    expect({}).toMatchSnapshot();
  });
});
