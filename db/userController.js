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

// returns all user data
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

///////////////////////////////////////////////////////////////////////////////
//                   to seed database with user records                      //
//               uncomment function below and restart server                 //
//      set the records variable to specify number of records to create      //
///////////////////////////////////////////////////////////////////////////////


// var records = 100;

// var userGenerator = require('./seed-data.js');
// for (var i = 0; i < records; i++) {
//   addUser(userGenerator(), function() {
//     console.log('seed record created');
//   });
// }
