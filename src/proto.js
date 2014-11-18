
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

/*/////////////////////////////////////////////////////////////////////////////
// Public API
/////////////////////////////////////////////////////////////////////////////*/


  Cliopatra.prototype.option = function( flag, type, desc, fn ){

    var data = this.data;
        flag = flag.replace(/\s+/g,' ').trim(); //remove duplicate whitespace
    var opts = flag.split(' ');
    var rule = {};

    for( var i=0, len = opts.length; i < len; i++ ){
      var opt = opts[i];

      util.ruleBuilder( opt, rule, data );

      if( desc ) rule.desc = desc;
      if( fn   ) rule.hanlder = fn;

    }

    //setup flags after rule is built
    var flags  = data.flags;
    var ruleID = data.rules.length || 0;
    if( rule.short ) flags[ rule['short'] ] = ruleID;
    if( rule.long  ) flags[ rule['long']  ] = ruleID;

    data.rules.push( rule );

    console.log( '---- rule >>>',  flag,  '\n', rule, '\n------\n');
    return this;
  }


  Cliopatra.prototype.rule = function( rules ){
    return this;
  }

  Cliopatra.prototype.flag    = function(){}
  Cliopatra.prototype.count   = function(){}
  Cliopatra.prototype.alias   = function(){}
  Cliopatra.prototype.require = function(){}

  Cliopatra.prototype.parse = function( err, data ){
    console.log('yay parse');
    var data = this.data;
    return this;
  }


  return Cliopatra;

}

