var jwt = require('jsonwebtoken');
var appConfig = require('../../config/appconfig.js').config();


module.exports = (router, admin, client) => {

  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    client.auth().signInWithEmailAndPassword(username, password)
      .then((user) => {
        var payload = { id: user.uid }
        var token = jwt.sign(payload, appConfig.jwtSecretOrKey) 
        res.status(200).json({ 
          message: "success", 
          token: token, 
          uid: user.uid });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
  })

  router.post('/register', (req, res) => {

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
  });

};