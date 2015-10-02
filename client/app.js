angular.module('jupitr', [
    'jupitr.services',
    'jupitr.login',
    'jupitr.home',
    'jupitr.profile',
    'jupitr.discover',
    'jupitr.cohort',
    'ngRoute'
  ])
  .config(function($routeProvider) { 
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'homeController'
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'loginController'
      })
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'homeController'
      })
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'profileController'
      })
      .when('/discover', {
        templateUrl: 'app/discover/discover.html',
        controller: 'discoverController'
      })
      .when('/cohort', {
        templateUrl: 'app/cohort/cohort.html',
        controller: 'cohortController'
      })
      .otherwise({
        redirectTo: '/'
      });
});
