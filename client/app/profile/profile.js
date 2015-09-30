angular.module('jupitr.profile', [])
.controller('profileController', function($scope, User, $location) { 
  $scope.user = {};

  $scope.update = function(user) {
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
    console.log(data);
    // get profile data from session
    $scope.user = data;
  });
});
