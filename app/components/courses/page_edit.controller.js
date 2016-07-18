/**
 * Created by yong on 16/6/20.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .controller('CoursesPageEditController', Controller);

  /* @ngInject */
  function Controller($state, $stateParams, CoursesService, $localStorage, TeachersService, toaster) {
    var vm = this;
    vm.title = 'Controller';
    vm.save = save;
    vm.cancel = cancel;
    TeachersService
      .list()
      .then(function (res) {
        vm.teachers = res.data.data;
      });
    vm.edit = {
      name: $localStorage.edit.name,
      sort: $localStorage.edit.sort,
      teachers: []
    };
    angular.forEach($localStorage.edit.teachers.data, function (i) {
      vm.edit.teachers.push(i.id);
    });

    activate();

    ////////////////

    function activate() {

    }

    function save() {
      CoursesService
        .sectionsEdit($stateParams.id, vm.edit)
        .then(function (res) {
          toaster.pop('success', '更新成功');
          $state.go('app.courses.page', {
            id: $stateParams.coursesId
          })
        })
    }

    function cancel() {
      $state.go('app.courses.page', {
        id: $stateParams.coursesId
      })
    }
  }
})();
