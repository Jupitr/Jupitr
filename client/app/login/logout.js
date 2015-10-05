angular.module('jupitr.logout', [])
  .controller('logoutController', function($scope, User, $location){
    // function to remove stored user data in localstorage upon logging out
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