angular.module('jupitr.services', [])

.factory('User', function($http, $location) {
  // need to add handle success/errors to these?
  
  var getAll = function(cb) {
    return $http({
      method: 'GET', 
      url: '/api/allusers'
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
      url: '/api/users' //this route currently does not exist
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var update = function(user) {
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST', 
      url: '/api/update',
      data: user
    });
  };

  var logout = function() {
    return $http({
      method: 'GET',
      url: 'api/logout'
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
    update: update,
    logout: logout
  };

}); 
