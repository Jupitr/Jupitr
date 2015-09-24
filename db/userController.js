var User = require('./userModel.js');

// creates new user record
exports.addUser = function(data, callback) {
  
};

// controller to return all user data to the client
// exports.sendAllUsers = function(callback) {
exports.sendUsers = function(callback) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
      return;
    }
    callback(users);
  });
};