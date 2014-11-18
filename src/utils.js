  



  function autoload(){
    //check for env_file
    //check for ./clio.json
    //check for ../clio.json
    //check for ../conf/clio.json
  }


/*/////////////////////////////////////////////////////////////////////////////
// Option Parsing
/////////////////////////////////////////////////////////////////////////////*/

  var charLookup = {
    '*' : 'required',
    '<' : 'required',
    '[' : 'optional',
    '^' : 'xor',
    '&' : 'group',
    '|' : 'alias',
    '@' : 'collect',
    '?' : 'optional',
    '!' : 'boolean',
    '=' : 'keyed'
  };


  function ruleBuilder( flag, rule, data ){
    rule = rule || {};

    var short,long;
    var delim = charLookup[ flag[0] ] || false;
    var type  = flagParser( flag );
        flag  = flag.replace(/-|&|\^|\|\*/gm, '');

    var section = rule[ type ] || rule[ delim ] || false;
    var undef   = ( typeof section === 'undefined' );

    if( !delim ){

      if( type === 'complex' || type === 'long' ){
        complexParser( flag, rule );
      } 

      if( type === 'short'   || type === 'long' ){
        if( section ){
          rule.alias = rule.alias || [];        
          rule.alias.push( flag );
        }else{
          rule[ type ] = flag;
        }


        
      }

    }else{

      if( delim === 'group'    || delim === 'xor' ){
        if( undef ) section = rule[ delim ] = '';
        rule[ delim ] = [ section, flag ].join('');
      }

      if( delim === 'required' || delim === 'optional' ){
        if( undef ) rule[ delim ] = 0;
        rule[ delim ] += 1;
      } 

      if( delim === 'boolean' ){
        booleanParser( flag, rule );
      }

      if( delim === 'collect' ){
        console.warn('collect option not implemented');
      }

    }



  }

  function booleanParser( flag ){

  }

  function complexParser( flag ){
    var vals = flag.split(/[:=]+/);
  }

  //tests showed str[] perf better than indexOf and RegEx
  function flagParser( flag ){
    var len = flag.length || 0;

    if( len >= 2 && flag[0] === '-'){
      //short flag
      if( flag[1] !== '-' ){ 
        if( len > 2 ) return 'complex'
        return 'short';
      }else{
      //long flag, at least -- 
        if( len === 2 ) return 'variant';// --
        if( len >= 4 && flag[2] === 'n' && flag[3] === 'o' ){
          if( len > 4 && flag[4] === '-' ) return 'nodash'; //--no-xxx
          return 'nolong'; //--noxxx
        }
        return 'long'; //--xxx
      }
    }
    if( flag[0] === '-' ) return 'stdin';
    return false;
  }



/*/////////////////////////////////////////////////////////////////////////////
// Type Checking
/////////////////////////////////////////////////////////////////////////////*/  

  function type( x ){
    if( x == null ) return obj + "";
    var t = typeof x;
    return ( t === "object" || t === "function" ? lookup[ toString.call( x ) ] || "object" : t ); 
  }

  function isUndefined( x ){
    return ( x === void 0 );
  }

  function isString( x ){
    return typeof x == "string" || (typeof x == "object" && o.constructor === String);
  }

  function isNum( x ){
    return typeof x == "number" || (typeof x == "object" && o.constructor === Number);
  }

/*/////////////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////////////*/ 

  module.exports = {
    type        : type,
    isUndefined : isUndefined,
    isString    : isString,
    isNum       : isNum,
    flagParser  : flagParser,
    ruleBuilder : ruleBuilder,
    autoload    : autoload,
    common      : common
  };