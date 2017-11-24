var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;


module.exports = (passport, config, admin) => {

  var jwtOpts = {};
  jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOpts.secretOrKey = config.jwtSecretOrKey;
  var strategy = new JwtStrategy(jwtOpts, (jwtPayload, next) => {
    const { id } = jwtPayload;

    admin.auth().getUser(id)
      .then((user) => {
        
        next(null, user);
      })
      .catch((err) => {
        
        next(null, false);
      });
  });

  passport.use(strategy);
};