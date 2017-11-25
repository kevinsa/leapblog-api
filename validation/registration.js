module.exports  = {
  validateRequest: (req) => {
    req.sanitize('name').escape();
    req.sanitize('email').escape();
    req.sanitize('password').escape();

    req.checkBody('name', 'invalid name').notEmpty().isAscii();
    req.checkBody('email', 'invalid email address').notEmpty().isEmail();
    req.checkBody('password', 'invalid password').isLength({min: 6}).isAscii();

    return req.validationErrors();
  }
};