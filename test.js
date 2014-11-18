

"use strict" 

/*/////////////////////////////////////////////////////////////////////////////
// Includes
/////////////////////////////////////////////////////////////////////////////*/
 

  var cliopatra = require('./cliopatra');

  var program = cliopatra.option('-s= ^we &ui --silly --nilly --illy (f1) ? ? ?', 'ok girl')
                         .option('-c, --color [ flag ]') 
                         .option('-v, --verbose [ flag ]')
                         .argv();

  program.run();



  // function flagParser( flag ){
  //   var len = flag.length || 0;

  //   if( len >= 2 && flag[0] === '-'){
  //     //short flag
  //     if( flag[1] !== '-' ){ 
  //       if( len > 2 ) return 'complex'
  //       return 'short';
  //     }else{
  //     //long flag, at least -- 
  //       if( len === 2 ) return 'variant';// --
  //       if( len >= 4 && flag[2] === 'n' && flag[3] === 'o' ){
  //         if( len > 4 && flag[4] === '-' ) return 'nodash'; //--no-xxx
  //         return 'nolong'; //--noxxx
  //       }
  //       return 'long'; //--xxx
  //     }
  //   }
  //   if( flag[0] === '-' ) return 'stdin';
  //   return false;
  // }

  // console.log( flagParser( '-a' ) );
  // console.log( flagParser( '-abf' ) );
  // console.log( flagParser( '--no' ) );
  // console.log( flagParser( '--no-x' ) );
  // console.log( flagParser( '--moo' ) );
  // console.log( flagParser( '--' ) );
  // console.log( flagParser( '-' ) );
  // console.log( flagParser( 'x' ) );