var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;


module.exports = (passport, config) => {

  var jwtOpts = {};
  jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOpts.secretOrKey = config.jwtSecretOrKey;
  var strategy = new JwtStrategy(jwtOpts, (jwtPayload, next) => {
    var user = { id: 1 };
    
    console.log('jwt payload: ' + jwtPayload);
    if(user) {
      next(null, user);
    }
    else
    {
      next(null, false);
    }
  });

  passport.use(strategy);
};