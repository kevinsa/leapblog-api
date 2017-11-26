var jwt = require('jsonwebtoken');
var appConfig = require('../../config/appconfig.js').config();
const registerRequestValidator = require('../../validation/registration');
const loginRequestValidator = require('../../validation/login');


module.exports = (router, admin, client) => {

  router.post('/login', (req, res) => {

    var errors = loginRequestValidator.validateRequest(req);
    if(errors) {
      res.status(400).json( { errors: errors });
    }
    else {
      const { username, password } = req.body;

      client.auth().signInWithEmailAndPassword(username, password)
      .then((user) => {
        var payload = { id: user.uid, name: user.displayName }
        var token = jwt.sign(payload, appConfig.jwtSecretOrKey) 
        res.status(200).json({ 
          message: "success", 
          token: token, 
          uid: user.uid,
          name: user.displayName
        });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
    }
  })

  router.post('/register', (req, res) => {

    var errors = registerRequestValidator.validateRequest(req);
    
    if(errors) {
      res.status(400).json( { errors: errors });
    }
    else {
      const { name, email, password } = req.body;

      admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
        disabled: false,
        emailVerified: false,
      })
        .then((user) => {
          res.status(200).json({ name: name, email: email, password: password })
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  });

};