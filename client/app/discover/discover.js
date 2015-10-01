angular.module('jupitr.discover', [])

.controller('discoverController', function($scope, User) {
  $scope.profiles = JSON.parse(window.localStorage.getItem('hrr8.jupitr'));
  
  // $scope.getProfiles = function() {
  //   console.log('get profiles called');
  //   User.getAll(function(data) {
  //     $scope.profiles = data;
  //   });
  // };
  
  //  $scope.init = function() {
  //   console.log('getting profiles');
  //   $scope.getProfiles();
  // };
  
  // $scope.init();

});
