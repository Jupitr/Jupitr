var User = require('./userModel.js');

// creates new user record
exports.addUser = addUser = function(data, callback) {
  var user = new User({
    name: data.name,
    githublogin: data.githublogin,
    email: data.email,
    cohort: data.cohort,
    zip: data.zip,
    githublink: data.githublink,
    twitter: data.twitter,
    website: data.website,
    gender: data.gender,
    race: data.gender,
    thesis: data.thesis,
    thesisurl: data.thesisurl,
    greenfield: data.greenfield,
    legacy: data.legacy,
    technologies: data.technologies,    
  });
  
  // adds current and past employment information as sub docs
  user.currentemployer.push(data.currentemployer);
  user.prioremployer1.push(data.prioremployer1);
  user.prioremployer2.push(data.prioremployer2);
  user.prioremployer3.push(data.prioremployer3);
  
  user.save(function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('user record created');  
    callback();
  });
  
};

// TODO -- add functionality to update a user record

// returns an array all user profiles as separate JSON objects
exports.sendAllUsers = function(callback) {
  User.find({}, function(err, users) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('sending user information');
    callback(users);
  });
};

// finds specific user profile based on github login handle
// passes callback a JSON object of profile or undefined
exports.findUserProfile = function(login, callback) {
  User.find({githublogin: login}, function(err, profile) {
    if (err) {
      console.error(err);
      return;
    }
    callback(profile[0]);
  });
};

///////////////////////////////////////////////////////////////////////////////
//                   to seed database with user records                      //
//               un-comment function below and restart server                //
//      set the records variable to specify number of records to create      //
//    re-comment the function to avoid seeding the database multiple times   //
///////////////////////////////////////////////////////////////////////////////

/*
var records = 100;

var userGenerator = require('./seed-data.js');
for (var i = 0; i < records; i++) {
  addUser(userGenerator(), function() {
    console.log('seed record created');
  });
}
*/
