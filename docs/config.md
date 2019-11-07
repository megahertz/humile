# Configuring humile

Humile tries to read configuration from these sources:

1. `humile.config.json` *(lowest priority)*

    Example:
    
    ```
    {
      "reporter": "list"
    }
    ```

2. `humile.config.js`

    Example:
    
    ```
    module.exports = {
      reporter: 'list',
    };
    ```

3. `humile` section of `package.json`

    Example:
    
    ```
    {
      ...
      "humile": {
        "reporter": "list"
      },
      ...
    }
    ```

4. `HUMILE_${OPTION}` Environment variables Keys transformed to camelCase

    Example:
    
    ```
    $ env HUMILE_REPORTER=list HUMILE_STYLE.CODE.NUMBER_OF_LINES=10 humile
    ```
    
    it will be similar to the following config:
    
    ```
    {
      reporter: 'list',
      style: {
        code: {
          numberOfLines: 10,
        },
      },
    }
    ```

5. Command line arguments *(highest priority)*

    ```
    $ humile -R list --style.code.number-of-lines 10
    ```

You can run `humile config` to view resulted configuration.

## General

#### `mask` {string | string[]}

Default: `'**/*{[sS]pec,[T]est}.[jt]s?(x)'`

Glob pattern for finding spec files. By default 

#### `ignore` {string | string[]}

Default `'+(node_modules|dist)/**'`

Glob pattern for excluding spec files. Keep in mind that changing the value
rewrites default values.

If you need to check how mask and ignore options work together run
`humile list`. It prints all spec files which match the masks.

#### `ignoreExt` {string | string[]}

Default: `[]`

Ignore some extensions of required modules. It can be useful when you want
to test some code without compiling by bundler.

Example:

`humile --ignore-ext .css`

*someModule.js*

```
import styles from './styles.css
// when running tests, styles is {}
```

#### `require` {string | string[]}

Default: `[]`

This modules will be loaded before spec files.

Example: 

`humile --require @babel/register`

#### path {string}

Default: `process.cwd()`

Working directory

#### filter {string}

Default: `undefined`

Filter specs to run only those that match the given string

## Appearance

#### colors {boolean}

Default: `process.stdout.isTTY`

Turn on colors in spec output

#### reporter {string}

Default: `'default'`

Which reporter is used to inform you about specs execution

- default
- list (similar to default Mocha reporter)
- mini (most compact)
- jasmine (similar to classic Jasmine reporter)

#### style

Here are default options which used to pretty print failed expectation by
reporter:

```
{
  // Diff displayed when some expectation is failed 
  diff: {
    actualColor: 'red',
    actualTextColor: 'red',
    actualSign: '-',
    disabled: false,
    expectedColor: 'green',
    expectedTextColor: 'green',
    expectedSign: '+',

    // By default, actual value is displayed above expected
    expectedFirst: false, 
  },

  // Code fragment displayed when some expectation is failed 
  code: {
    disabled: false,
    numberOfLines: 3,
  },
}
```



