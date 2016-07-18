(function () {
  'use strict';

  angular.module('app')
    .service('AuthService', AuthService);

  AuthService.$inject = ['ENDPOINT', '$http'];

  function AuthService(ENDPOINT, $http) {
    return {
      login: login
    };

    function login(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/auth/login',
        data: data
      });
    }
  }

})();
