# Cliopatra

  A complete and lightweight solution for Node.js command-line interfaces, inspired by Perl's [Getopt](http://search.cpan.org/~jv/Getopt-Long-2.42/), and following the [POSIX syntax](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html) for command line options.

## Installation

    $ npm install cliopatra

## Style

  As a matter of style you can use the `clio` instead of `cliopatra`; code examples and API docs use these two interchangebly.

```js
  var clio = require('cliopatra');
```

## Quick Start Example


```js
#!/usr/bin/env node
"use strict" 

  var cliopatra = require('cliopatra');

  var program = cliopatra.option('-s= ^we &ui --silly --nilly --illy (f1) ? ? ?', 'ok girl')
                         .option('-c, --color [ flag ]') 
                         .option('-v, --verbose [ flag ]')
                         .parse( process.argv );

  program.run();
```

## Cliopatra Settings

Cliopatra can be configured to use short-cut arguments and automatically parse and load option rules from an object or a JSON file to make some aspects of your executable more automated.

## Cliopatra#settings( String[,String...] )

*AUTO_SHORT
*AUTO_BOOLEAN
*AUTO_LOAD
*RULES_OVERWRITE
*USE_COMMON_FLAGS
*USE_DEBUG_FLAG
*MODE_INTERACTIVE
*MODE_PIPETHROUGH

