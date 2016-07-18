/**
 * Created by yong on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('TeachersEditController', Controller);

  /* @ngInject */
  function Controller($stateParams, TeachersService, toaster, $state) {
    var vm = this;
    vm.title = 'Controller';
    vm.save = save;
    vm.cancel = cancel;

    activate();

    ////////////////

    function activate() {
      TeachersService
        .show($stateParams.id)
        .then(function (res) {
          vm.create = res.data.data;
        });
    }

    function save() {
      TeachersService
        .edit($stateParams.id, vm.create)
        .then(function (res) {
          toaster.pop('success', '保存成功');
          $state.go('app.teachers.tab.list', {status: 'published'})
        })
    }

    function cancel() {
      $state.go('app.teachers.tab.list', {status: 'published'})
    }
  }
})();
