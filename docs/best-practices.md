# Humile best practices

It's just recommendations, so you can ignore it

## Place specs in __specs__ directory near the actual code

```
models
├─┬ __sepcs__
│ ╰── User.spec.js
╰── User.js
```

This file structure is similar to jest recommendations. Such a structure brings
the following advantages:

 - __specs__ directory is located near the code, but stands out from another
   resources.
 - A tests are always stored near the code, so you don't need to jump across
   the whole project hierarchy.
 - It's easier to move directories when refactoring.
 - Short require paths.

## Place helpers into the top __specs__ directory

```
projects
╰─┬ __sepcs__
  ╰─┬ __helpers
    ├── matchers.spec.js
    ╰── init-db.spec.js
```

You can explicitly specify modules which will be included before specs using
`require` option, but it's easier to just place such a files in the directory
as in example above. There are no predefined paths like `/__specs__/__helpers`
in humile. These path are just the first which humile finds when searching
for specs according to its name. So feel free to use different names like 
`/_init/matchers.spec.js` The only rule, it should named to be the first in
file list, and its name should ends with `spec.js` or `test.js` to match default
spec mask.

## Try to disable global functions

It's a good practice to use explicit imports instead of global
function. So, you can import standard jasmine functions like `describe`, `it`,
`expect` and so on explicitly:

```js
const { describe, expect, it } = require('humile');
```

When all your specs use local functions, you can set `globals` options to false.

## Use common JavaScript best practices

 - Prefer to use the modern ES features.
 - Use linters like eslint. Personally, I recommend to use it together with 
   [airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).
 - Follow the common
   [Jasmine best practices](https://github.com/sinaru/devible/blob/master/programming/javascript/jasmine/jasmine-best-practices.md).
