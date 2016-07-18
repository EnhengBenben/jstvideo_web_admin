/**
 * Created by yong on 16/6/20.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CoursesPageCreateController', Controller);

  /* @ngInject */
  function Controller($state, $stateParams, TeachersService, toaster, CoursesService) {
    var vm = this;
    vm.title = 'Controller';
    vm.video = video;//保存并跳转到视频上传;
    vm.cancel = cancel;
    activate();

    ////////////////

    function activate() {
      TeachersService
        .list()
        .then(function (res) {
          vm.teachers = res.data.data;
        })
    }

    function video() {
      CoursesService
        .sectionsCreate($stateParams.id, vm.create)
        .then(function (res) {
          toaster.pop('success', '保存成功');
          $state.go('app.courses.video', {coursesId: $stateParams.id, id: res.data.data.id});
        })
    }

    function cancel() {
      $state.go('app.courses.page', {
        id: $stateParams.id
      })
    }
  }
})();
