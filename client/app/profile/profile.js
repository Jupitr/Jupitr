angular.module('jupitr.profile', [])
.controller('profileController', function($scope) { // add param Profile?
  $scope.profile = {}; // should be $scope.master?

  $scope.updateProfile = function(user) {
    $scope.profile = angular.copy(user); // should be $scope.master?
  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };

  $scope.reset();
});
