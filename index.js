var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var appConfig = require('./config/appconfig.js').config();

console.log(appConfig);

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
/*
var jwtConfig = { secretOrKey: 'leapblogsecretkey' }
var jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = jwtConfig.secretOrKey;
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
*/
require('./config/passport.js')(passport, appConfig);
app.use(passport.initialize());

// Routes
var router = express.Router();
app.use('/api', router);
require('./app/controllers/auth.js')(router, appConfig);
require('./app/controllers/blogpost.js')(router, passport);
require('./app/controllers/blogcomment.js')(router, passport);


var port = process.env.PORT || 8090;
app.listen(port, () => {
  console.log(`leapblog api running on port ${port}...`);
});