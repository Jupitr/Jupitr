angular.module('jupitr.profile', [])
.controller('profileController', function($scope, User, $location) { 
  // get profile from session. 
  $scope.profile = User.getMyRecord(function(data) {
    return data; // Add || {}?
  }); 

  $scope.update = function(user) {
    // store deep copy of user object in profile object
    $scope.profile = angular.copy(user); 
    // Update using User factory (see services.js) with updated user profile, 
    // then send to profile page again
    User.update($scope.profile)
      .then(function() {
        $location.path('/profile');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.reset = function() {
    // reset user object to stored profile 
    $scope.user = angular.copy($scope.profile);
  };

  User.getMyRecord(function(data){
    console.log(data);
    $scope.reset();
  });
});
