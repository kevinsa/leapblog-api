const commentsBasePath = '/comments';
const requestValidator = require('../../validation/blogcomments');
const responseFormatter = require('../../formatting/snapshot');

module.exports = (router, passport, database) => {

  var _getCommentsRef = (blogId) => {
    return database.ref(`${commentsBasePath}/${blogId}`);
  };

  var _getCommentRef = (blogId, commentId) => {
    return database.ref(`${commentsBasePath}/${blogId}/${commentId}`);
  }
  
  /*
  * Get all comments on a blog post
  */
  router.get('/blogposts/:blogid/comments', (req, res) => {

    const { blogid } = req.params;

    _getCommentsRef(blogid).once('value', (snap) => {
      res.status(200).json({ comments: responseFormatter.snapToArray(snap) });
    });
  });

  /*
  * Add a comment to a blog post
  */
  router.post('/blogposts/:blogid/comments', passport.authenticate('jwt', { session: false }), (req, res) => {

    var errors = requestValidator.validateRequest(req);
    
    if(errors) {
      res.status(400).json( { errors: errors });
    }
    else {
      const { blogid } = req.params;
      const { content } = req.body;
      if(content) {
        var commentRef = _getCommentsRef(blogid).push({
          content: content,
          user: {
            uid: req.user.uid,
            displayName: req.user.displayName
          },
          date: Date.now()
        });
  
        res.status(200).json({ comment_ref: commentRef });
      }
      else
      {
        res.status(500).json({ message: `unable to add comment to blog post: ${blogid}`});
      }
    }
  });

  /*
  * Update a comment on blog post
  */
  router.put('/blogposts/:blogid/comments/:commentid', passport.authenticate('jwt', { session: false }), (req, res) => {

    var errors = requestValidator.validateRequest(req);
    
    if(errors) {
      res.status(400).json( { errors: errors });
    }
    else {
      const { blogid, commentid } = req.params;
      const { content } = req.body;
      
      _getCommentRef(blogid, commentid).once('value', (snap) => {
        let comment = snap.val();
        if(comment) {
          if(requestValidator.canEditOrDelete(comment, req)){
            //update the comment
            _getCommentRef(blogid, commentid).update({
              content,
              date: Date.now()
            }, (err) => {
              if(!err) {
                res.status(204).json({ message: `updated comment: ${commentid} on blog post: ${blogid}`});
              }
              else
              {
                res.status(500).json({ 
                  message: `unable to update comment: ${commentid} on blog post: ${blogid}`,
                  error: err
                });
              }
            });
          }
          else
          {
            res.status(401).json({ message: `unauthorized to modify comment: ${commentid}` });
          }
        }
        else 
        {
          res.status(404).json({ message: `unable to locate comment: ${commentid}` });
        }
        
      });
    }
  });

  /*
  * Delete a comment from a blog post
  */
  router.delete('/blogposts/:blogid/comments/:commentid', passport.authenticate('jwt', { session: false }), (req, res) => {
    
        const { blogid, commentid } = req.params;

        _getCommentRef(blogid, commentid).once('value', (snap) => {
          let comment = snap.val();
          if(comment) {
            if(requestValidator.canEditOrDelete(comment, req)){
              //delete the comment
              _getCommentRef(blogid, commentid).remove((err) => {
                if(!err) {
                  let message = `removed comment: ${commentid} from blog post: ${blogid}`;
                  res.status(200).json({ message: message});
                }
                else 
                {
                  let messge = `unable to remove comment: ${commentid} from blog post: ${blogid}`;
                  res.status(500).json({ error: err });
                }
              });
            }
            else {
              res.status(401).json({ message: `unauthorized to modify comment: ${commentid}` });
            }
          }
          else {
            res.status(404).json({ message: `unable to locate comment: ${commentid}` });
          }
        });
  });
};