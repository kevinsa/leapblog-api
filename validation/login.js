module.exports  = {
  validateRequest: (req) => {
    req.sanitize('username').escape();
    req.sanitize('password').escape();

    req.checkBody('username', 'invalid name').notEmpty().isEmail();
    req.checkBody('password', 'invalid password').isLength({min: 6}).isAscii();

    return req.validationErrors();
  }
};