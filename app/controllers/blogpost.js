module.exports = (router, passport) => {

  router.get('/blogposts', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.status(200).json({ message: 'GET all blog posts' });

  });

  router.post('/blogposts', (req, res) => {

    res.status(200).json({ message: 'POST a new blog' });

  });

  router.get('/blogposts/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: `GET single blog with id: ${id}`});

  });

  router.put('/blogposts/:id', (req, res) => {

    const { id } = req.params;

    res.status(200).json({ message: `GET single blog with id: ${id}`});
  });

  router.delete('/blogposts/:id', (req, res) => {

    const { id } = req.params;

    res.status(200).json({ message: `DELETE single blog with id: ${id}`});
  });

};