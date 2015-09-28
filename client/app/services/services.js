angular.module('jupitr.services', [])

.factory('User', function($http) {
  // if not a user, add user profile
  // if user, update user profile
  // need to add handle success/errors to these?
  var getAll = function() {
    return $http({
      method: 'GET', 
      url: '/api/users/'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getById = function(user) {
    return $http({
      method: 'GET', 
      url: '/api/users/' + user.id
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getByUsername = function(user) {
    return $http({
      method: 'GET', 
      url: '/api/users/' + user.name
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getGithubData = function(user) {

  };  

  var create = function(user) {
    return $http({
      method: 'POST', 
      url: '/api/users/' + user.id,
      data: user
    });
  };

  var update = function(user) {
    return $http({
      method: 'POST', // s/b PUT?
      url: '/api/update/' + user.id,
      data: user
    });
  };

  var deleteUser = function(user) {
    return $http({
      method: 'DELETE', 
      url: '/api/users/' + user.id
    });
  };

  return {
    getAll: getAll,
    getById: getById,
    getByUsername: getByUsername,
    getGithubData: getGithubData,
    create: create,
    update: update,
    deleteUser: deleteUser
  }

})
.factory(); // Auth factory
