  



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
    '<' : 'required',
    '[' : 'optional',
    '^' : 'xor',
    '&' : 'group',
    '|' : 'alias',
    '@' : 'collect',
    '?' : 'boolean',
    '!' : 'demand',
    '+' : 'increment'
  };


  function ruleBuilder( flag, rule, data ){
    rule = rule || {};

    var short,long;
    var delim = charLookup[ flag[0] ] || false;

    //lookahead for more delims
    if( delim && !(delim === 'required' || delim === 'optional') && flag.length > 1 ){
      ruleBuilder( flag.substr(1) , rule, data );
    }

    var type  = flagParser( flag );
        flag  = flag.replace(/-|&|\^|\|\*/gm, '');

    var section = rule[ type ] || rule[ delim ];
    var undef   = ( typeof section === 'undefined');

    if( type ){

      if( type === 'short' || type === 'long' ){
        if( section ){
          rule.alias = rule.alias || [];        
          rule.alias.push( flag );
        }else{
          rule[ type ] = flag;
        }
      }

    }

    //first char is not - and is not alnum
    if( delim ){

      if( delim === 'group'    || delim === 'xor' ){
        if( undef ) section = rule[ delim ] = '';
        rule[ delim ] = [ section, flag ].join('');
      }

      if( delim === 'required' || delim === 'optional' ){
        if( rule['boolean'] ) throw new Error('Invalid Option, boolean options cannot have arguments');           
        if( undef ) rule[ delim ] = 0;
        rule[ delim ] += 1;
      } 

      if( delim === 'boolean' || delim === 'increment' ){
        if( rule.required || rule.optional ) throw new Error('Invalid Option, options with argument-options cannot be auto-set (boolean/increment)');  
        if( rule.boolean  || rule.increment )  throw new Error('Invalid Option, auto-set option already specified');
        rule[ delim ]    = true;
        rule[ 'canKey' ] = true; //allow -x=val
      }

      if( delim === 'demand' ){
        rule[ delim ] = true;
      }

      if( delim === 'collect' ){
        console.warn('collect option not implemented');
      }

    }

    if( !delim && !type ) throw new Error('Invalid Option settings option('+ flag + type + ')');

  }



  //tests showed str[] perf better than indexOf and RegEx
  function flagParser( flag ){
    var len = flag.length || 0;
    if( !flag || len === 0 || flag[0] !== '-' ) return false;
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
    autoload    : autoload
  };