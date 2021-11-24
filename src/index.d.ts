import { EventEmitter } from 'events';
import 'jasmine'

declare namespace HumileNs {
  type HumileExpect = <T>(actual: T) => HumileNs.HumileMatchers<T>
    & typeof expect;

  class Humile extends EventEmitter {
    /**
     * Current running spec
     */
    readonly currentSpec?: Result;

    on(event: 'spec', listener: (result: Result) => void): this;
    on(event: 'spec-done', listener: (result: Result) => void): this;
    on(event: 'suite', listener: (result: Result) => void): this;
    on(event: 'suite-done', listener: (result: Result) => void): this;
    on(event: 'start', listener: (result: jasmine.SuiteInfo) => void): this;
    on(event: 'done', listener: (result: jasmine.RunDetails) => void): this;
  }

  interface Result extends jasmine.CustomReporterResult {
    filePath?:  string;
  }

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

    humile: Humile;
  }

  interface HumileMatchers<T> extends jasmine.Matchers<any> {
    /**
     * Expect the actual value to match the expected, like
     * toEqual(jasmine.objectContaining(expected))
     * @param expected Expected value.
     * @example
     * expect(bigObject).toMatchObject({ "foo": ['bar', 'baz'] });
     */
    toMatchObject(expected: object): boolean;

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

declare const Humile: HumileNs.JasmineExport & {
  default: HumileNs.JasmineExport;
};

export = Humile;
