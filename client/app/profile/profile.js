angular.module('jupitr.profile', [])
.controller('profileController', function($scope, $location, User) { 
  $scope.user = {};
  $scope.school = {};
  $scope.technology = {};

  $scope.update = function() {
    // combine school name (HR/HRRB) with cohort number
    // to send back to database as HR # or HRRB #
    $scope.user.cohort = $scope.school.name + " " + $scope.user.cohort;
    // technologies are stored as an array in database.
    // loop through technology object and push key name
    // into technologies array.
    $scope.user.technologies = [];
    for (var prop in $scope.technology) {
      if ($scope.technology[prop] === true) {
        $scope.user.technologies.push(prop);
      }      
    }
    // Update using User factory (see services.js) with updated user profile, 
    // then send to profile page again
    User.update($scope.user)
      .then(function() {
        $location.path('/profile');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  User.getMyRecord(function(data){
    // get profile data from session
    $scope.user = data;

    /////////////////// Remove before going live - testing only ////////////////////////////
    // $scope.user.cohort = "HRRB 4";
    // $scope.user.city = "Malibu";
    // $scope.user.state = "CA";
    // $scope.user.zip = "90263";
    // $scope.user.gender = "female";
    // $scope.user.race = "Caucasion/White";
    // $scope.user.twitter = "twitty"; 
    // $scope.user.website = "http://www.mysite.com"; 
    // $scope.user.currentemployer = "placeholder";
    // $scope.user.currentemployerrole = "placeholder";
    // $scope.user.currentemployertype = "contract"; 
    // $scope.user.currentemployerstartdate = new Date();
    // $scope.user.prioremployer1 = "placeholder";
    // $scope.user.prioremployer1role = "placeholder";
    // $scope.user.prioremployer1type = "contract"; 
    // $scope.user.prioremployer1startdate = new Date();
    // $scope.user.prioremployer1enddate = new Date();
    // $scope.user.prioremployer2 = "placeholder";
    // $scope.user.prioremployer2role = "placeholder"; 
    // $scope.user.prioremployer2type = "contract"; 
    // $scope.user.prioremployer2startdate = new Date();
    // $scope.user.prioremployer2enddate = new Date();
    // $scope.user.prioremployer3 = "placeholder";
    // $scope.user.prioremployer3role = "placeholder";
    // $scope.user.prioremployer3type = "contract"; 
    // $scope.user.prioremployer3startdate = new Date();
    // $scope.user.prioremployer3enddate = new Date();
    // $scope.user.thesis = "placeholder"; 
    // $scope.user.thesisurl = "http://www.thesis.com"; 
    // $scope.user.greenfield = "placeholder"; 
    // $scope.user.legacy = "placeholder"; 
    // $scope.user.technologies = ["Android", "CSS"]; 
    ////////////////////////////////////////////////////////////////////////////////////////

    // Split school name (HR/HRRB) from cohort number
    // for use in form
    if ($scope.user.cohort) {
      $scope.school.name = $scope.user.cohort.split(' ')[0];
      $scope.user.cohort = $scope.user.cohort.split(' ')[1];
    }
    // technologies are stored as an array in database.
    // to assign them to a checkbox, loop through technologies array
    // and assign each item as a property on $scope.technology 
    if ($scope.user.technologies) {
      for (var i = 0; i < $scope.user.technologies.length; i++) {
        $scope.technology[$scope.user.technologies[i]] = true;
      }
    }
  });
});
