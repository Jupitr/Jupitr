angular
  .module('jupitr.login', [])
  .controller('LoginController', function($scope){
    $scope.login = function(path){
      $location.path(path);
    };
  });

