# Cliopatra

  A lightweight solution for Node.js command-line interfaces, inspired by Perl's [Getopt](http://search.cpan.org/~jv/Getopt-Long-2.42/), and following the [POSIX syntax](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html) for command line options.

## Installation

    $ npm install cliopatra


## Quick Start Example


```js
#!/usr/bin/env node
"use strict" 
  var clio      = require('cliopatra');
  var program   = clio.enable('autoshort')
                      .option('--short ! <arg1> <arg2>', 'This is a required flag with 2 reqd args')
                      .option('--trial ?!', 'This is a required boolean flag' )
                      .option('--licks+', 'This is a required incrementing flag' )
                      .argv();

  program.run();
```

## Style

  As a matter of style you can use the `clio` instead of `cliopatra`; code examples and API docs use these two interchangebly.

```js
  var clio = require('cliopatra');
```

## Cliopatra Settings

Cliopatra can be configured to use short-cut arguments and automatically parse and load option rules from an object or a JSON file to make some aspects of your executable more automated.

### Cliopatra#enable( String[,String...] )

* autoshort   - if a long option is passed, automatically use the first alpha char as a short option
* autoflag    - automatically support a not long flag, --flag => --no-flag, can also set flag -f=true 
* autoload    - look for clio.json file or check if package.json has a clio section
* overwrite   - if a rule or flag already exists overwrite with newest
* usecommon   - enable common flags like --debug and --version
* interactive - clio will loop until and exit option is provided --exit is added by default
* pipe        - clio will run in silent mode and stream output to stdout

