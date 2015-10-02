angular.module('jupitr.discover', [])

.controller('discoverController', function($scope, User) {
  $scope.profiles = JSON.parse(window.localStorage.getItem('hrr8.jupitr'));
});
