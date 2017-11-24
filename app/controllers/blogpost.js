module.exports = (router, passport) => {

  router.get('/blogposts', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { user } = req;

    res.status(200).json({
      message: 'GET all blog posts',
      user: user
     });
  });

  router.post('/blogposts', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.status(200).json({ message: 'POST a new blog' });

  });

  router.get('/blogposts/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: `GET single blog with id: ${id}`});

  });

  router.put('/blogposts/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { id } = req.params;

    res.status(200).json({ message: `GET single blog with id: ${id}`});
  });

  router.delete('/blogposts/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { id } = req.params;

    res.status(200).json({ message: `DELETE single blog with id: ${id}`});
  });

};