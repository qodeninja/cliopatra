 

"use strict" 

/*/////////////////////////////////////////////////////////////////////////////
// Includes 
/////////////////////////////////////////////////////////////////////////////*/

 
  var util   =  require('./utils.js');
  var conf    = require('./settings.js');
  var factory = require('./proto.js');


/*/////////////////////////////////////////////////////////////////////////////
// Standard/Custom Cliopatra Factory
/////////////////////////////////////////////////////////////////////////////*/

  //standard
  var Cliopatra = factory( conf, util );

  //add your own settings and util - dependency injecty
  function custom( c, u ){
    var Clio = factory( (c||conf), (u||util) );
    return Clio;
  }

  //built-in
  function create( spec ){
    var Clio = factory( conf, util );
    var c = new Clio( spec );
    return c;
  }

/*/////////////////////////////////////////////////////////////////////////////
// Export
/////////////////////////////////////////////////////////////////////////////*/

  module.exports           = create();
  module.exports.util      = util;
  module.exports.config    = custom;
  module.exports.Cliopatra = Cliopatra;
