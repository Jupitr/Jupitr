angular.module('jupitr.home', [])
  .controller('homeController', function($scope, User) {
    $scope.url = 'app/home/home_animation.js';
    $scope.loadVis = function(url) {
      var s = document.createElement('script');
      s.type='text/javascript';
      s.src= url;
      document.getElementsByTagName('head')[0].appendChild(s);
    };
    User.getAll(function(data){
      $scope.data = data;
      $scope.loadVis($scope.url);
    });
  });
