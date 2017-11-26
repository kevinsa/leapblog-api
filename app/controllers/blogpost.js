const blogPostsBasePath = '/blogposts';
const requestValidator = require('../../validation/blogposts');
const responseFormatter = require('../../formatting/snapshot');

module.exports = (router, passport, database) => {

  var _getBlogPostsRef = () => {
    return database.ref(blogPostsBasePath);
  };

  var _getBlogPostRef = (blogpostId) => {
    return database.ref(`${blogPostsBasePath}/${blogpostId}`);
  }

  /*
  * Get all blog posts
  */
  router.get('/blogposts', (req, res) => {
    _getBlogPostsRef().once('value', (snap) => {
      res.status(200).json({ blogposts: responseFormatter.snapToArray(snap) });
    });
  });

  /*
  * Get a blog post by push key (unique id)
  */
  router.get('/blogposts/:id', (req, res) => {
    const { id } = req.params;

    _getBlogPostRef(id).once('value', (snap) => {
      if(snap.val()) {
        res.status(200).json({ blogposts: snap.val() });
      }
      else {
        res.status(404).json({ message: `unable to locate blog post: ${id}`});
      }
    });

  });

  /*
  * Create a new blog post
  */
  router.post('/blogposts', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    var errors = requestValidator.validateRequest(req);

    if(errors) {
      res.status(400).json( { errors: errors });
    }
    else {
      const { title, content } = req.body;

      var blogPostRef = _getBlogPostsRef().push({
        title: title,
        content: content,
        user: {
          uid: req.user.uid,
          displayName: req.user.displayName
        },
        date: Date.now()
      });

      res.status(200).json({ blogpost_ref: blogPostRef });
    }
  });

  /*
  * Update a blog post
  */
  router.put('/blogposts/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    var errors = requestValidator.validateRequest(req);

    if(errors) {
      res.status(400).json( { errors: errors });
    }
    else {
      const { id } = req.params;
      const { title, content } = req.body;
  
      _getBlogPostRef(id).once('value', (snap) => {
        let blogPost = snap.val();
        if(blogPost) {
          if(requestValidator.canEditOrDelete(blogPost, req)){
            _getBlogPostRef(id).update({ title, content, date: Date.now() }, (err) => {
              if(!err) {
                res.status(204).json({ message: `updated blog post: ${id}`});
              }
              else 
              {
                res.status(500).json({ 
                  message: `unable to update blog post: ${id}`, 
                  error: err 
                });
              }
            });
          }
          else {
            res.status(401).json({ message: `unauthorized to modify blog post: ${id}` });
          }
        }
        else {
          res.status(404).json({ message: `unable to locate blog post: ${id}` });
        }
      });
    }
  });

  /*
  * Delete a blog post
  */
  router.delete('/blogposts/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { id } = req.params;

    _getBlogPostRef(id).once('value', (snap) => {
      let blogPost = snap.val();
      if(blogPost) {
        if(requestValidator.canEditOrDelete(blogPost, req)){
          _getBlogPostRef(id).remove((err) => {
            if(!err) {
              res.status(204).json({ message: `removed blog post: ${id}`});
            }
            else
            {
              res.status(500).json({
                message: `unable to remove blog post: ${id}`,
                error: err });
            }
          });
        }
        else {
          res.status(401).json({ message: `unauthorized to modify blog post: ${id}` });
        }
      }
      else {
        res.status(404).json({ message: `unable to locate blog post: ${id}` });
      }
    });
  });

};