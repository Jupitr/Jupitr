angular.module('jupitr.profile', [])
.controller('profileController', function($scope, $location, User) { 
  $scope.user = {};
  $scope.school = {};

  $scope.update = function() {
    // combine school name (HR/HRRB) with cohort number
    // to send back to database as HR # or HRRB #
    $scope.user.cohort = $scope.school.name + " " + $scope.user.cohort;
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
    // Split school name (HR/HRRB) from cohort number
    // for use in form
    if ($scope.user.cohort) {
      $scope.school = $scope.user.cohort.split(' ')[0];
      $scope.user.cohort = $scope.user.cohort.split(' ')[1];
    }
  });
});
