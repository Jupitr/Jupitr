angular.module('jupitr.services', [])

.factory('User', function($http) {

  var getGithubProfile = function(user) {

  };

  var update = function(user) {
    // if not a user, add user profile
    // if user, update user profile
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
