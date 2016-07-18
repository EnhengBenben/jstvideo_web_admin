/**
 * Created by yong on 16/6/20.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('TeachersShowController', Controller);

  /* @ngInject */
  function Controller($localStorage, $timeout, $uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;
    vm.title = 'Controller';
    vm.teachers = $localStorage.teachers;
    var write = $timeout(function () {
      $('#introduce').html(vm.teachers.introduce);
    });

    activate();

    ////////////////

    function activate() {
    }

    function cancel() {
      $uibModalInstance.close('cancel');
    }
  }
})();
