angular.module('jupitr.home', [])
  .controller('homeController', function($scope, User) {
    $scope.url = 'app/home/home_animation.js';
    // function to load home_animation.js to the page
    $scope.loadVis = function(url, data) {
      console.log('loading');
      var s = document.createElement('script');
      s.type='text/javascript';
      s.src= url;
      document.getElementsByTagName('head')[0].appendChild(s);
    };
    // download all user data from the server
    $scope.getAll = User.getAll;
  })
  .directive('homeVis', function() {
    return {
      restrict: 'E',
      replace: 'false',
      // scope is the controller $scope
      scope: true,
      link: function(scope) {
        scope.getAll(function(data){
          if (data) {
            data = JSON.stringify(data);
            // store data in localstorage
            window.localStorage.setItem('hrr8.jupitr', data);
          }
          scope.loadVis(scope.url);
        });
      }
    };
  });