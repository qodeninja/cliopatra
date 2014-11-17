"use strict" 

  var clio = ( function CliopatraFactory( c ){

    console.log( 'calling CliopatraFactory' );
    return c;

  })( function Cliopatra( spec ){ 

    console.log( 'calling Cliopatra after factory returns' );

  }( '', [] ));

