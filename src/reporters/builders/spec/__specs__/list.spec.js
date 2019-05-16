'use strict';

const { describe, it, jasmine, expect } = require('../../../../index');

const listSpecBuilder = require('../list');

describe('listSpecBuilder', () => {
  it('should build title and spec description strings', () => {
    const builder = listSpecBuilder();

    expect(builder(createSpecResult())).toEqual([
      { text: 'test', indent: 1, newLine: true },
      { text: '✓', color: 'green', indent: 2 },
      { text: ' description', color: 'gray' },
      { text: '', newLine: true },
    ]);

    expect(builder(createSpecResult())).toEqual([
      { text: '✓', color: 'green', indent: 2 },
      { text: ' description', color: 'gray' },
      { text: '', newLine: true },
    ]);
  });

  it('should build execution time for slow tests', () => {
    const builder = listSpecBuilder({
      specStartTime: {
        spec1: new Date(new Date() - 200),
        spec2: new Date(new Date() - 20),
      },
    });

    expect(builder(createSpecResult({ id: 'spec1' }))).toEqual([
      { text: 'test', indent: 1, newLine: true },
      { text: '✓', color: 'green', indent: 2 },
      { text: ' description', color: 'gray' },
      { text: jasmine.stringMatching(/\(\d+ms\)/), color: 'red' },
      { text: '', newLine: true },
    ]);

    expect(builder(createSpecResult({ id: 'spec2' }))).toEqual([
      { text: '✓', color: 'green', indent: 2 },
      { text: ' description', color: 'gray' },
      { text: jasmine.stringMatching(/\(\d+ms\)/), color: 'gray' },
      { text: '', newLine: true },
    ]);
  });

  it('should build failed tests', () => {
    const builder = listSpecBuilder();

    expect(builder(createSpecResult({ status: 'failed' }))).toEqual([
      { text: 'test', indent: 1, newLine: true },
      { text: '✕', color: 'red', indent: 2 },
      { text: ' description', color: 'red' },
      { text: '', newLine: true },
    ]);
  });

  it('should build pending tests', () => {
    const builder = listSpecBuilder();

    expect(builder(createSpecResult({ status: 'pending' }))).toEqual([
      { text: 'test', indent: 1, newLine: true },
      { text: '⌛', color: 'cyan', indent: 2 },
      { text: ' description', color: 'cyan' },
      { text: '', newLine: true },
    ]);
  });
});

function createSpecResult(data = {}) {
  return {
    status: 'passed',
    fullName: 'test',
    description: 'description',
    ...data,
  };
}
