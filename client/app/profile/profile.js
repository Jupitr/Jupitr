angular.module('jupitr.profile', [])
.controller('profileController', function($scope, Users) {  
  $scope.profile = {}; 

  $scope.update = function(user) {
    // deep copy of user object stored in profile object
    $scope.profile = angular.copy(user); 
    // Update Users with updated user profile, then send to main/home page
    Users.update($scope.profile)
      .then(function() {
        $location.path('/');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.reset = function() {
    // reset user object to stored profile (empty if not filled out previously)
    $scope.user = angular.copy($scope.profile);
  };

  $scope.reset();
});
