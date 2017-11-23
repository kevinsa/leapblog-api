var jwt = require('jsonwebtoken');

module.exports = (router, appConfig) => {

  router.post('/login', (req, res) => {
    const {username, password} = req.body;

    //locate the user by username
    var user = { id: 1, password: 'pass' };
    if(!user) {
      res.status(401).json({ message: 'user not found'});
    }

    if(user.password === password) {
      var payload = { id: user.id };
      var token = jwt.sign(payload, appConfig.jwtSecretOrKey)
      res.status(200).json({ message: "success", token: token });
    }
    else
    {
      res.status(401).json({ message: "invalid login" });
    }

  });

  router.post('/register', (req, res) => {

    const { name, email, password } = req.body;
    
    res.status(200).json({ name: name, email: email, password: password });

  });

};