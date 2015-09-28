angular.module('jupitr.services', [])

.factory('User', function($http) {
  // if not a user, add user profile
  // if user, update user profile
  var getGithubData = function(user) {

  };

  var getProfile = function(user) {

  };

  var create = function(user) {

  };

  var update = function(user) {
    return $http({
      method: 'POST',
      url: '/api/update',
      data: user
    });
  };

  return {
    update: update
  }

})
.factory(); // Auth factory
