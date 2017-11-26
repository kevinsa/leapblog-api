module.exports  = {
  validateRequest: (req) => {
    req.sanitize('title').escape();
    req.sanitize('content').escape();

    req.checkBody('title', 'invalid blog post title').notEmpty().isAscii();
    req.checkBody('content', 'invalid blog post content').notEmpty().isAscii();

    return req.validationErrors();
  },
  canEditOrDelete(blogPost, req) {
    return blogPost.user.uid === req.user.uid;
  }
};