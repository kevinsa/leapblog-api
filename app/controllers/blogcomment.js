module.exports = (router, passport) => {
  
  router.get('/blogposts/:blogid/comments', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { blogid } = req.params;
    
    res.status(200).json({ message: `GET comments for blog with id: ${blogid}`});
  });

  router.post('/blogposts/:blogid/comments', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { blogid } = req.params;
    
    res.status(200).json({ message: `CREATE comment on blog with id: ${blogid}`});
  });

  router.delete('/blogposts/:blogid/comments/:commentid', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { blogid, commentid } = req.params;
    
    var message = `DELETE comment on blog with id: ${blogid} and comment: ${commentid}`
    res.status(200).json({ message: message});

  });

  router.put('/blogposts/:blogid/comments/:commentid', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { blogid, commentid } = req.params;
    const { user } = req;
    
    var message = `UPDATE comment on blog with id: ${blogid} and comment: ${commentid}`
    res.status(200).json({ message: message});

  });

  
  };