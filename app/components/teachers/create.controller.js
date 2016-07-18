/**
 * Created by yong on 16/6/17.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('TeachersCreateController', Controller);

  /* @ngInject */
  function Controller(TeachersService,toaster,$state) {
    var vm = this;
    vm.title = 'Controller';
    vm.save = save;
    vm.cancel = cancel;

    activate();

    ////////////////

    function activate() {
    }

    function cancel() {
      $state.go('app.teachers.tab.list',{status:'published'});
    }

    function save() {
      TeachersService
        .create(vm.create)
        .then(function (res) {
          toaster.pop('success','添加成功');
          $state.go('app.teachers.tab.list',{status:'published'});
        })
    }
  }
})();
