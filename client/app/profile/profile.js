angular.module('jupitr.profile', [])
.controller('profileController', function($scope, $location, User, $window) { 
  $scope.user = {};
  $scope.school = {};
  $scope.technology = {};
  $scope.date = {};

  $scope.update = function() {
    // combine school name (HR/HRRB) with cohort number
    // to send back to database as HR # or HRRB #
    $scope.user.cohort = $scope.school.name + " " + $scope.school.cohort;
    // technologies are stored as an array in database.
    // loop through technology object and push key name
    // into technologies array.
    $scope.user.technologies = [];
    for (var prop in $scope.technology) {
      if ($scope.technology[prop] === true) {
        $scope.user.technologies.push(prop);
      }      
    }
    // convert dates back to strings.
    // in future, should be changed so dates on user obj only update when inputs change.
    if ($scope.date.currentemployerstartdate) {
      $scope.user.currentemployerstartdate = String($scope.date.currentemployerstartdate);
    }
    if ($scope.date.prioremployer1startdate) {
      $scope.user.prioremployer1startdate = String($scope.date.prioremployer1startdate);
    }
    if ($scope.date.prioremployer1enddate) {
      $scope.user.prioremployer1enddate = String($scope.date.prioremployer1enddate);
    }
    if ($scope.date.prioremployer2startdate) {
      $scope.user.prioremployer2startdate = String($scope.date.prioremployer2startdate);
    }
    if ($scope.date.prioremployer2enddate) {
      $scope.user.prioremployer2enddate = String($scope.date.prioremployer2enddate);
    }
    if ($scope.date.prioremployer3startdate) {
      $scope.user.prioremployer3startdate = String($scope.date.prioremployer3startdate);
    }
    if ($scope.date.prioremployer3enddate) {
      $scope.user.prioremployer3enddate = String($scope.date.prioremployer3enddate);
    } 
    // Update using User factory (see services.js) with updated user profile, 
    // then refresh page
    User.update($scope.user)
      .then(function() {
        $window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  User.getMyRecord(function(data){
    // get profile data from session
    $scope.user = data;

    // Split school name (HR/HRRB) from cohort number
    // for use in form
    if ($scope.user.cohort) {
      $scope.school.name = $scope.user.cohort.split(' ')[0];
      $scope.school.cohort = $scope.user.cohort.split(' ')[1];
    }
    // technologies are stored as an array in database.
    // to assign them to a checkbox, loop through technologies array
    // and assign each item as a property on $scope.technology 
    if ($scope.user.technologies) {
      for (var i = 0; i < $scope.user.technologies.length; i++) {
        $scope.technology[$scope.user.technologies[i]] = true;
      }
    }
    // convert date string data to dates for use in form.
    // saved in date variable so there are no form validation errors
    // when we convert back to strings in update function.
    if ($scope.user.currentemployerstartdate) {
      $scope.date.currentemployerstartdate = new Date($scope.user.currentemployerstartdate);
    }
    if ($scope.user.prioremployer1startdate) {
      $scope.date.prioremployer1startdate = new Date($scope.user.prioremployer1startdate);
    }
    if ($scope.user.prioremployer1enddate) {
      $scope.date.prioremployer1enddate = new Date($scope.user.prioremployer1enddate);
    }
    if ($scope.user.prioremployer2startdate) {
      $scope.date.prioremployer2startdate = new Date($scope.user.prioremployer2startdate);
    }
    if ($scope.user.prioremployer2enddate) {
      $scope.date.prioremployer2enddate = new Date($scope.user.prioremployer2enddate);
    }
    if ($scope.user.prioremployer3startdate) {
      $scope.date.prioremployer3startdate = new Date($scope.user.prioremployer3startdate);
    }
    if ($scope.user.prioremployer3enddate) {
      $scope.date.prioremployer3enddate = new Date($scope.user.prioremployer3enddate);
    }
  });

});
