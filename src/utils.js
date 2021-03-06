  



  function autoload(){
    //check for env_file
    //check for ./clio.json
    //check for ../clio.json
    //check for ../conf/clio.json
  }

  //note:this can probably be its own module
  function readline( prompt, dispatcher ){

    var sti = process.stdin;
    var sto = process.stdout;

    var pr = prompt;

    var evt = {
      readable : onReadable,
      command  : onCommand,
      error    : onFinish,
      end      : onFinish
    };

    //iterate over evt obj and setup or teardown eventhanlders
    function listeners( enable ){
      for(var key in evt) sti[ ( enable ? 'on' : 'removeListener' ) ]( key, evt[key] );
      if(!enable){
        sti = null;
        sto = null;
        console.log('shutting down reader');
      }
    }

    function getPrompt( p ){
      p = p || pr;
      sto.write( p );
    }

    //on user input pass chunks to handler or emit command to dispatcher
    function onReadable(){
      var ctrl  = dispatcher;
      var chunk = sti.read();
      if( chunk !== null ){
        //chunk response
        if( typeof ctrl === 'function' ) return ctrl(chunk, getPrompt);
        sti.emit('command', chunk, ctrl );
        getPrompt();
      }
    }

    //let the dispatcher handle the command or just dump to stdo
    function onCommand( command, dispatcher ){
      if( dispatcher && dispatcher.command ){
        var ret = dispatcher.command(command, getPrompt);
        if(!ret) onFinish();
      }
      sto.write( 'command -- ' + command );
    }

    //cleanup on err or end
    function onFinish( err ){
      listeners( false );
      if( err ){
        console.error( err );
      }
    }

    //hard kill
    process.on('SIGINT', function() {
      console.log('\nExiting...');
      //process.kill(process.pid, 'SIGUSR2');
      process.exit();
    });

    listeners( true );
    sti.setEncoding('utf8');
    sto.write( pr );

  }

/*/////////////////////////////////////////////////////////////////////////////
// Timer
/////////////////////////////////////////////////////////////////////////////*/
  
  var timers = {};
  var NANO_SECOND = 1e9;

  function timer( i, v ){

    if( typeof i !== 'string' ){
      i = i[0]; 
    }

    var suite   = timers[ i ] = timers[ i ] || {}; //instantiate if it doesnt exist

    v = v || suite.curr; //if v is passed use it, otherwise use cache

    var version = suite[ v ]  = suite[ v ]  || {};

    suite.curr = v;

    if( !version.start ){
      delete version.stop;
      version.start  = process.hrtime();
      //version._start = version.start[0] * NANO_SECOND + version.start[1];
      //console.log('starting' + i + v);
      return [i,'START'];
    }

    if( version.start ){
      version.time = process.hrtime(version.start);
      version.diff = (version.time[0] * 1e9 + version.time[1])/1e9;
      //version._stop = version.stop[0] * NANO_SECOND + version.stop[1];
      //version.diff = ( version.stop[0] * NANO_SECOND + version.stop[1] -
      //                 version.start[0] * NANO_SECOND + version.start[1] );
      //console.log('stopping' + i + v);
      return [i,'STOP'];
    }


  };

/*/////////////////////////////////////////////////////////////////////////////
// Option Parsing
/////////////////////////////////////////////////////////////////////////////*/

  function ruleBuilder( flag, rule, data ){
    rule = rule || {};
    findDelim ( flag, rule );
    findOption( flag, rule );    
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
        if( len >=  4 && flag[2] === 'n' && flag[3] === 'o' ){
          if( len > 4 && flag[4] === '-' ) return 'nodash'; //--no-xxx
          return 'nolong'; //--noxxx
        }
        return 'long'; //--xxx
      }
    }
    if( flag[0] === '-' ) return 'stdin';
    return false;
  }



  function ruleDelim( delim, rule ){
    var section = rule[ delim ];
    var undef   = ( typeof section === 'undefined');
    if( delim ){
      if( delim === 'group' || delim === 'xor' ){
        if( undef ) section = rule[ delim ] = '';
        rule[ delim ] = [ section, flag ].join('');
      }
      if( delim === 'required' || delim === 'optional' ){
        if( rule['boolean'] ) throw new Error('Invalid Option');           
        if( undef ) rule[ delim ] = 0;
        rule[ delim ] += 1;
      } 
      if( delim === 'boolean' || delim === 'increment' ){
        if( rule.required || rule.optional )  throw new Error('Invalid Option');  
        if( rule.boolean  || rule.increment ) throw new Error('Invalid Option');
        rule[ delim ]    = true;
        rule[ 'canKey' ] = true; //allow -x=val
        rule[ 'accept' ] = ( delim === 'boolean' ? 'boolean' : 'integer' );
      }
      if( delim === 'demand' ){
        rule[ delim ] = true;
      }
      if( delim === 'collect' ){
        console.warn('collect option not implemented');
      }
    }

  }



  function findDelim( flag, rule, data ){
    var len       = flag.length;
    var delim     = lookupChar( flag[0] );
    var lastDelim = lookupChar( flag[len-1] );
    var flags     = flag.replace(alnumRegex,'');
    delim = lastDelim || delim;
    if( delim && !(delim === 'required' || delim === 'optional') && flag.length > 1 ){
      ruleDelim( delim, rule )
      findDelim( ( lastDelim ? flag.slice(-1) : flag.substr(1)) , rule, data );
    }else{
      ruleDelim( ( lastDelim ? flag.slice(-1) : flag.substr(1)), rule );
    }

  }

  function findOption( flag, rule ){
    var type    = flagParser( flag );
    var section = rule[ type ];
    var undef   = ( typeof section === 'undefined');
    var flag    = flag.replace(charRegEx, '');   
    if( type ){
      if( type === 'short' || type === 'long' ){
        if( section ){
          rule.alias = rule.alias || [];        
          rule.alias.push( flag );
        }else{
          rule[ type ] = flag;
        }
      }
      return true;
    }
    return false;
  }



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

  var charRegEx  = /\&|@|!|\-|&|\^|\||\?|\+|\</gm;
  var alnumRegex = /[a-zA-Z0-9\-]/gm;

  function lookupChar( char ){
    if(char === '<'){ 
      return 'required'; 
    }else if(char === '['){ 
      return 'optional';
    }else if(char === '^'){ 
      return 'xor';
    }else if(char === '&'){ 
      return 'group';
    }else if(char === '|'){ 
      return 'alias';
    }else if(char === '@'){ 
      return 'collect';
    }else if(char === '?'){ 
      return 'boolean';
    }else if(char === '!'){ 
      return 'demand';
    }else if(char === '+'){ 
      return 'increment';
    }
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
    readline    : readline,
    timer       : timer,
    timers      : timers
  };