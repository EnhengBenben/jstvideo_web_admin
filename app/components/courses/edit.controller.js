/**
 * Created by yong on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CoursesEditController', Controller);

  /* @ngInject */
  function Controller($state, toaster, $stateParams, CoursesService) {
    var vm = this;
    vm.title = 'Controller';
    vm.save = save;
    vm.cancel = cancel;

    activate();

    ////////////////

    function activate() {
      CoursesService
        .show($stateParams.id)
        .then(function (res) {
          vm.create = res.data.data;
        })
    }

    function save() {
      CoursesService
        .edit($stateParams.id, vm.create)
        .then(function (res) {
          toaster.pop('success', '保存成功');
          $state.go('app.courses.tab.list', {status: 'published'})
        })
    }

    function cancel() {
      $state.go('app.courses.tab.list', {status: 'published'});
    }
  }
})();
