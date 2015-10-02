angular.module('jupitr.logout', [])
  .controller('logoutController', function($scope, User, $location){
    $scope.clearLocalStorage = function() {
      window.localStorage.setItem('hrr8.jupitr', null);
      console.log(window.localStorage.getItem('hrr8.jupitr'));
    };
    User.logout()
    .then(function(){
      $location.path('/login');
    });
    $scope.clearLocalStorage();
  });