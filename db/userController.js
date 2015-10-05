var User = require('./userModel.js');

// returns an array of all user profiles as separate JSON objects
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

// creates new user record
exports.addUser = addUser = function(data, callback) {
  var user = new User({
    name: data.name,
    githublogin: data.githublogin,
    email: data.email,
    cohort: data.cohort,
    zip: data.zip,
    twitter: data.twitter,
    website: data.website,
    gender: data.gender,
    race: data.race,
    thesis: data.thesis,
    thesisurl: data.thesisurl,
    greenfield: data.greenfield,
    legacy: data.legacy,
    technologies: data.technologies,
    currentemployer: data.currentemployer,
    currentemployerrole: data.currentemployerrole,
    currentemployertype: data.currentemployertype,
    currentemployerstartdate: data.currentemployerstartdate,
    prioremployer1: data.prioremployer1,
    prioremployer1role: data.prioremployer1role,
    prioremployer1type: data.prioremployer1type,
    prioremployer1startdate: data.prioremployer1startdate,
    prioremployer1enddate: data.prioremployer1enddate,
    prioremployer2: data.prioremployer2,
    prioremployer2role: data.prioremployer2role,
    prioremployer2type: data.prioremployer2type,
    prioremployer2startdate: data.prioremployer2startdate,
    prioremployer2enddate: data.prioremployer2enddate,
    prioremployer3: data.prioremployer3,
    prioremployer3role: data.prioremployer3role,
    prioremployer3type: data.prioremployer3type,
    prioremployer3startdate: data.prioremployer3startdate,
    prioremployer3enddate: data.prioremployer3enddate,   
  });
  
  user.save(function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('user record created');  
    callback();
  });
  
};

// updates user profile
exports.updateProfile = updateProfile = function(data, callback) {
  User.findByIdAndUpdate(data._id, data, function(err, profile) {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
}; 


///////////////////////////////////////////////////////////////////////////////
//            to seed database with user records for deployment:             //
//                un-comment function below and restart server               //
//            also comment-out the setTimeout call in seed-data.js           //
//      set the records variable to specify number of records to create      //
//    re-comment the function to avoid seeding the database multiple times   //
///////////////////////////////////////////////////////////////////////////////


// var records = 400;

// var userGenerator = require('./seed-data.js');
// for (var i = 0; i < records; i++) {
//   addUser(userGenerator(), function() {
//     console.log('seed record created');
//   });
// }

