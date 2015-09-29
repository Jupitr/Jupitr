angular.module('jupitr.login', [])
  .controller('loginController', function($scope){
    $scope.login = function(path){
      $location.path(path);
    };
  });

