angular.module('jupitr.services', [])

.factory('User', function($http, $location) {
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

  var getMyRecord = function(cb) {
    return $http({
      method: 'GET',
      url: '/api/profile'
    })
    .then(function(resp) {
      if (resp.data === 'Unauthorized') {
        $location.path('/login');
      }
      else {
        cb(resp.data);
      }
    });
  };

  var getUser = function(user) {
    return $http({
      method: 'GET', 
      url: '/api/users/' + user.githublogin
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var update = function(user) {
    return $http({
      method: 'POST', // s/b PUT?
      url: '/api/update/' + user.githublogin,
      data: user
    });
  };

  // var create = function(user) {
  //   return $http({
  //     method: 'POST', 
  //     url: '/api/users/' + user.id,
  //     data: user
  //   });
  // }; 

  // var deleteUser = function(user) {
  //   return $http({
  //     method: 'DELETE', 
  //     url: '/api/users/' + user.id
  //   });
  // };

  return {
    getMyRecord: getMyRecord,
    getAll: getAll,
    getUser: getUser,
    update: update
  };

}); 
