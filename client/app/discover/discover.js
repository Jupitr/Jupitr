angular.module('jupitr.discover', [])

.controller('discoverController', function($scope, User) {
  
  // retrieves all user profiles from local storage to display on discover page
  $scope.profiles = JSON.parse(window.localStorage.getItem('hrr8.jupitr'));
  
});
