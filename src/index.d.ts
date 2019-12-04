import '@types/jasmine'

declare namespace Humile {
  type HumileExpect = <T>(actual: T) => Humile.HumileMatchers<T>
    & typeof expect;

  interface JasmineExport {
    describe: typeof describe;
    xdescribe: typeof xdescribe;
    fdescribe: typeof fdescribe;
    it: typeof it;
    xit: typeof xit;
    fit: typeof fit;
    beforeEach: typeof beforeEach;
    afterEach: typeof afterEach;
    beforeAll: typeof beforeAll;
    afterAll: typeof afterAll;
    expect: HumileExpect;
    expectAsync: typeof expectAsync;
    pending: typeof pending;
    fail: typeof fail;
    spyOn: typeof spyOn;
    spyOnProperty: typeof spyOnProperty;
    spyOnAllFunctions: typeof spyOnAllFunctions;
    jsApiReporter: jasmine.JsApiReporter;
    jasmine: typeof jasmine;

    before: typeof beforeEach;
    after: typeof afterEach;
    test: typeof it;
  }

  interface HumileMatchers<T> extends jasmine.Matchers<any> {
    /**
     * Expect the actual value to match snapshot
     *
     * @example
     * expect(thing).toMatchSnapshot();
     */
    toMatchSnapshot(): boolean;

    /**
     * Invert the matcher following this expect.
     */
    not: HumileMatchers<T>;
  }
}

declare const Humile: Humile.JasmineExport & {
  default: Humile.JasmineExport;
};

export = Humile;
