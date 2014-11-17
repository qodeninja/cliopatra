  


  function autofile(){
    //check for env_file
    //check for ./clio.json
    //check for ../clio.json
    //check for ../conf/clio.json
  }

  function autoload(){
  
  }

  function commonOptions(){

  }

/*/////////////////////////////////////////////////////////////////////////////
// Option Parsing
/////////////////////////////////////////////////////////////////////////////*/

  function optionType(){

  }

  //tests showed str[] perf better than indexOf and RegEx
  function optionType( flag ){
    let len = flag.length;
    let delim = flag[0];
    if( len >= 2 ){
      if( delim === '-' ){
        if( flag[1] !== '-' ){ //some kind of acceptible option
          if( len > 2 ) return COMPLEX_OPTION;//must be shortflag string, or invalid hmm
          if( len === 2 ) return SHORT_OPTION;//shortflag
        }else{
          if( len === 2 ) return VARIANT_OPTION;// --
          if( len >= 3 && flag[2] === 'n' && flag[3] === 'o') return LONG_NO_OPTION;
          if( len > 2 ) return LONG_OPTION; //long option flag
        }
      }
      var c = charLookup[ delim ];
      if( c ) return c;
    }
    if( len === 1 ){
      if( delim === '?' ) return CONF_OPT;
    }
    return UNKNOWN_OPTION; //not an option flag
  }

/*/////////////////////////////////////////////////////////////////////////////
// Type Checking
/////////////////////////////////////////////////////////////////////////////*/  

  function type( x ){
    if( x == null ) return obj + "";
    let t = typeof x;
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


  module.exports = {};