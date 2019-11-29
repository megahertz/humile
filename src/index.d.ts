import '@types/jasmine'

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
  expect: typeof expect;
  expectAsync: typeof expectAsync;
  pending: typeof pending;
  fail: typeof fail;
  spyOn: typeof spyOn;
  spyOnProperty: typeof spyOnProperty;
  spyOnAllFunctions: typeof spyOnAllFunctions;
  jsApiReporter: jasmine.JsApiReporter;
  jasmine: jasmine.Jasmine;
}

declare const Humile: JasmineExport & {
  default: JasmineExport;

  before: typeof beforeEach;
  after: typeof afterEach;
  test: typeof it;
};

export = Humile;
