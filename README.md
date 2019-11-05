# humile
[![Build Status](https://travis-ci.org/megahertz/humile.svg?branch=master)](https://travis-ci.org/megahertz/humile)
[![NPM version](https://badge.fury.io/js/humile.svg)](https://badge.fury.io/js/humile)

Make Jasmine Great Again!

## Description

node.js test framework on top of Jasmine

![Screenshot](docs/img/rcreenshort-general.png)

Features:

 - lightweight
 - fast
 - zero configuration
 - no globals (optional)
 - TypeScript ready
 - backward-compatible with Jasmine runner
 - very customizable

## Usage

1. Write your test

    **my-first.spec.js**

    ```js
    describe('my first spec', () => {
      it('should test a simple value', () => {
        expect(true).toBe(true);
      });
    });
    ```

2. Run humile

    `$ npx humile`
