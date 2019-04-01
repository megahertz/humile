# humile
[![Build Status](https://travis-ci.org/megahertz/humile.svg?branch=master)](https://travis-ci.org/megahertz/humile)
[![NPM version](https://badge.fury.io/js/humile.svg)](https://badge.fury.io/js/humile)
[![Dependencies status](https://david-dm.org/megahertz/humile/status.svg)](https://david-dm.org/megahertz/humile)

Make Jasmine Great Again!

## Description

node.js test framework on top of Jasmine. This project is in early alpha stage. 

Features:

 - lightweight
 - fast
 - zero config
 - no globals (optional)
 - typescript ready
 
Todo:

 - New reporter (now it uses reporter from jasmine-node)
 - Full doc and examples
 - Tests generator (maybe) 

## Usage

1. Install with [npm](https://npmjs.org/package/humile):

    npm install --save-dev humile
    
2. Add to your package.json:

```json
{
  "scripts": {
    "test": "humile"
  }
}
```

3. Write your test

```js
const { describe, expect, it } = require('humile');

describe('my first spec', () => {
  it('should test a simple value', () => {
    expect(true).toBe(true);
  });
});
```
