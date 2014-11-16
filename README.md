Cliopatra
=====

Low level utility for parsing command line args and wrapping executible scripts. 

```javascript
/*

 ( fn( o ){ ... } )( obj(){} )

*/

"use strict";

    /*
    req = {};
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };
    */


  ( function devoteFactory( c ){

    //# WHERE TO ATTACH FN/OBJECT

    //node
    //jquery
    //amd/require
    //browser
    console.log( 'calling devoteFactory' );
    return c;
    


  })( function devoteObject( ){ 

    console.log( 'calling devoteObject after factory returns' );

  })( '', [] );
```
