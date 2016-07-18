(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', Controller);

  /* @ngInject */
  function Controller($localStorage, $state) {
    var app = this;
    //vm.title = 'Controller';
    app.logout = logout;

    activate();

    ////////////////

    function activate() {
    }

    function logout() {
      $localStorage.token = null;
      $state.go('login');
    }
  }
})();
