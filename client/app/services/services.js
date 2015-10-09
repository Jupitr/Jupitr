angular.module('jupitr.services', [])

.factory('User', function($http, $location) {
  
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
  // getUser is not being used but may be of use in the future. 
  var getUser = function(user) {
    return $http({
      method: 'GET', 
      url: '/api/users' // this route currently does not exist
    })
    .then(function(resp) {
      return resp.data; // this may need to be modified
    });
  };

  var update = function(user) {
    updateUserLocal(user);
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
      url: '/logout'
    });
  };

  var updateUserLocal = function(user) {
    console.log('updating locally');
    var records = JSON.parse(window.localStorage.getItem('hrr8.jupitr'));
    for (var i = 0, l = records.length; i < l; i++) {
      if (user.githublogin === records[i].githublogin) {
        console.log('found records');
        records[i] = user;
        break;
      }
    }
    window.localStorage.setItem('hrr8.jupitr', JSON.stringify(records));
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
