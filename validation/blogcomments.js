module.exports  = {
  validateRequest: (req) => {
    req.sanitize('content').escape();
    req.checkBody('content', 'invalid blog post content').notEmpty().isAscii();

    return req.validationErrors();
  },
  canEditOrDelete(comment, req) {
    return comment.user === req.user.uid;
  }
};