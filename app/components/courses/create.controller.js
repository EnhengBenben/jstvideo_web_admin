/**
 * Created by yong on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CoursesCreateController', Controller);

  /* @ngInject */
  function Controller($state, CoursesService, toaster) {
    var vm = this;
    vm.title = 'Controller';
    vm.page = page;//保存并跳转到章节管理;
    vm.cancel = cancel;

    activate();

    ////////////////

    function activate() {

    }

    function page() {
      CoursesService
        .create(vm.create)
        .then(function (res) {
          toaster.pop('success', '添加成功');
          $state.go('app.courses.tab.list', {status: 'published'});
        });
    }

    function cancel() {
      $state.go('app.courses.tab.list', {status: 'published'});
    }
  }
})();
