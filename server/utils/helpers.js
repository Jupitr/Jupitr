'use strict';
module.exports = {
  // errorLogger: function (error, req, res, next) {
  //   // log the error then send it to the next middleware 
  //   console.error(error.stack);
  //   next(error);
  // },
  // errorHandler: function (error, req, res, next) {
  //   // send error message to client
  //   // message for gracefull error handling on app
  //   res.send(500, {error: error.message});
  // },
  validateUser: function (req, res, next) {
    if (req.session && req.session.uid) {
      next();
    }
    else {
      res.redirect('/login');
    }
  }
};
