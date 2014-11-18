
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
    this.data = spec.data || { args:{}, rules:[], flags:{}, error: false };
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


  Cliopatra.prototype.option = function( flag, desc, fn ){

    var data = this.data;
        flag = flag.replace(/\s+/g,' ').trim(); //remove duplicate whitespace
    var opts = flag.split(' ');
    var rule = {};

    for( var i=0, len = opts.length; i < len; i++ ){
      var opt = opts[i];

      try{
        util.ruleBuilder( opt, rule, data );
        if( desc ) rule.desc = desc;
        if( fn   ) rule.fn   = fn;
      }catch(err){
        console.error('Clio parse failure at ('+opt+')', err.message);
        process.exit(1);
      }

    }

    //setup flags after rule is built
    var flags  = data.flags;
    var long   = rule['long'], short = rule['short'];
    var ruleID = data.rules.length || 0;
    if( short ) flags[ short ] = ruleID;
    if( long ){
     flags[ long ] = ruleID;
      //create short from long
      if( conf['autoshort'] ){
        var sh = long[0];
        if( sh ){ flags[ sh ] = ruleID; }
        if( !short ){ rule['short'] = sh; }
      }
    }


    data.rules.push( rule );

    console.log( '---- rule >>>',  flag,  '\n', rule, '\n------\n');
    return this;
  }

  Cliopatra.prototype.enable = function( key ){
    key = key.toLowerCase();
    if( !util.isUndefined( conf[key]) ) conf[key] = true;
    return this;
  }

  Cliopatra.prototype.rule = function( rules ){
    return this;
  }

  Cliopatra.prototype.flag    = function(){}
  Cliopatra.prototype.count   = function(){}
  Cliopatra.prototype.alias   = function(){}
  Cliopatra.prototype.require = function(){}

  Cliopatra.prototype.argv    = function(){
    this.parse( process.argv );
    return this;
  }

  Cliopatra.prototype.parse = function( data ){
    console.log('yay parse');
    var data = this.data;
    return this;
  }


  return Cliopatra;

}

