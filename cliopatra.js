
"use strict" 

/*/////////////////////////////////////////////////////////////////////////////
// Includes 
/////////////////////////////////////////////////////////////////////////////*/

var clio = require('./src').clio;

console.log( clio );

clio.enable('autoshort').option('--short ! <arg1> <arg2>', 'This is a shortflag' );
clio.option('--trial ?!', 'This is a try it now flag' );
clio.option('--trial ?!+', 'This is a shortflag' );
clio.parse();