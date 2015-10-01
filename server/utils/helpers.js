var github = require('octonode');
var user = require('../../db/userController.js');

module.exports = {

  validateUser: function (req, res, next) {
    console.log('validate user', !!(req.session && req.session.uid));
    if (req.session && req.session.uid) {
      next();
    }
    else {
      res.end('Unauthorized');
    }
  },

  // get and check organization
  getOrgs: function (token, cb) {
    var client = github.client(token);
    var me = client.me();
    me.orgs(function(err, body){
      if (!err) {
        return cb(body.reduce(function(total, current){
          return current.login === 'remotebeta' || total;
        }, false));
      }
    });
  },

  // check if user has the correct authentication
  checkAuth: function (req, res, next) {
    console.log('checking auth');
    if (req.session && req.session.uid) {
      next(req.session.oauth, function(is){
        if (is) {
          module.exports.checkUserInDB(req, res, req.session.uid);
        }
        else {
          res.redirect('/#/logout');
        }
      });
    }
    else {
      res.redirect('/#/login');
    }
  },

  // check whether a valid user (i.e one that has HR auth) is already in the DB
  checkUserInDB: function(req, res, login) {
    user.findUserProfile(login, function(record){
      if (record) {
        record.inDB = true;
        res.redirect('/#/home');
      }
      else {
        req.session.userRecord.zip = '00000';
        user.addUser(req.session.userRecord, function() {
          res.redirect('/#/profile');
        });
      }
    });
  }
};
