
"use strict" 

/*/////////////////////////////////////////////////////////////////////////////
// Includes 
/////////////////////////////////////////////////////////////////////////////*/

var clio;

// --verbose --noverbose --no-verbose, --verbose+ --verbose!
// -- (stop)
// --option=s /string  s1,s2,s3
// --option=d /number
// --option=s@ /multi
// --option=s{2} / repeater => [1,2]
// --option=h /hash key=value
// opt_name, opt_value
// primary name | alias
// bundling
// 
// option('-s|--short+ ^xrt','set the short option', func( name, value ){}

module.exports = function( conf, util ){



  function Cliopatra( spec ){
    spec = spec || {};
    this.data = spec.data || { rules: [], flags: {}, error: false };
    //this.util = spec.util;
    //this.conf = spec.conf;
    return this;
  };


  Cliopatra.prototype.getRule = function(){

  }

  Cliopatra.prototype.getRuleID  = function( flag ){

  }
  
  Cliopatra.prototype.getRuleByFlag = function( flag ){

  }

  Cliopatra.prototype.option = function( flag, desc, handler ){
    return this;
  }

  Cliopatra.prototype.rule = function( rules ){
    return this;
  }

  Cliopatra.prototype.parse = function( err, data ){
    return this;
  }

  return Cliopatra;

}

