
"use strict" 

/*/////////////////////////////////////////////////////////////////////////////
// Includes 
/////////////////////////////////////////////////////////////////////////////*/

var clio = require('./src').clio;

console.log( clio );

clio.enable('autoshort').option('--short! ! <arg1> <arg2>', 'This is a shortflag' );
clio.option('-t --trial', 'This is a try it now flag' );
clio.option('-q --verbose+', 'This is an incrementing flag' );
clio.option('-y --yyum?', 'This is an incrementing flag' );
clio.parse();