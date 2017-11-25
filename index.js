var express = require('express');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var passport = require('passport');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var appConfig = require('./config/appconfig.js').config();
var client = require('firebase');
var admin = require('firebase-admin');
var serviceAccount = require(`./config/${appConfig.firebase_cert_file}`);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());

// CORS
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods',
			'GET,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers',
			'Content-Type,Authorization');

	if('OPTIONS' == req.method) {
		res.send(200);
	}
	else {
		next();
	}
};
app.use(allowCrossDomain);

// Firebase admin / client
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: appConfig.firebase_url
});
client.initializeApp(appConfig.firebase_client_config);
var database = admin.database();

// Passport
require('./config/passport.js')(passport, appConfig, admin);
app.use(passport.initialize());

// Routes
var router = express.Router();
app.use('/api', router);
require('./app/controllers/auth.js')(router, admin, client);
require('./app/controllers/blogpost.js')(router, passport, database);
require('./app/controllers/blogcomment.js')(router, passport, database);


var port = process.env.PORT || 8090;
app.listen(port, () => {
  console.log(`leapblog api running on port ${port}...`);
});