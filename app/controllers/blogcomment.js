module.exports = (router, passport) => {
  
  router.get('/blogposts/:blogid/comments', (req, res) => {

    const { blogid } = req.params;
    
    res.status(200).json({ message: `GET comments for blog with id: ${blogid}`});
  });

  router.post('/blogposts/:blogid/comments', (req, res) => {

    const { blogid } = req.params;
    
    res.status(200).json({ message: `CREATE comment on blog with id: ${blogid}`});
  });

  router.delete('/blogposts/:blogid/comments/:commentid', (req, res) => {

    const { blogid, commentid } = req.params;
    
    var message = `DELETE comment on blog with id: ${blogid} and comment: ${commentid}`
    res.status(200).json({ message: message});

  });

  router.put('/blogposts/:blogid/comments/:commentid', (req, res) => {

    const { blogid, commentid } = req.params;
    
    var message = `UPDATE comment on blog with id: ${blogid} and comment: ${commentid}`
    res.status(200).json({ message: message});

  });

  
  };