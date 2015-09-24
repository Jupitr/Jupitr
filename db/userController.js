var User = require('./userModel.js');

// creates new user record
exports.addUser = function(data, callback) {
  var user = {
  email: data.email,
  cohort: data.cohort,
  zip: data.zip,
  github: data.github,
  twitter: data.twitter,
  website: data.website,
  gender: data.gender,
  race: data.gender,
  thesis: data.thesis,
  thesisurl: data.thesisurl,
  greenfield: data.greenfield,
  legacy: data.legacy,
  technologies: data.technologies,    
  };
  
  // TODO -- coordinate how employment info will be passed
  // currentemployer: [employerSchema],
  // prioremployers: [employerSchema],
  
  user.save(function(err, savedUser) {
    if (err) {
      console.log(err);
      return;
    }
    callback();
  });
  
};

// TODO -- figure out functionality to update a user record

// controller to return all user data to the client
// exports.sendAllUsers = function(callback) {
exports.sendAllUsers = function(callback) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
      return;
    }
    callback(users);
  });
};