angular.module('jupitr.home', [])
  .controller('homeController', function($scope, User) {
    $scope.url = 'app/home/home_animation.js';
    $scope.loadVis = function(url, data) {
      console.log('loading');
      var s = document.createElement('script');
      s.type='text/javascript';
      s.src= url;
      document.getElementsByTagName('head')[0].appendChild(s);
    };
    $scope.getAll = User.getAll;
  })
  .directive('homeVis', function() {
    return {
      restrict: 'E',
      replace: 'false',
      scope: true,
      link: function(scope) {
        scope.getAll(function(data){
          if (data) {
            data = JSON.stringify(data);
            window.localStorage.setItem('hr8.jupitr', data);
          }
          scope.loadVis(scope.url);
        });
      }
    };
  });