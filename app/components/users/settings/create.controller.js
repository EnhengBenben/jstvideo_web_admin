/**
 * Created by yong on 16/6/20.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('UsersSettingsCreateController', Controller);

  /* @ngInject */
  function Controller(status, UsersService, toaster, $uibModalInstance, $location) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;


    return init();

    function init() {
      if (status === 'education') {
        vm.create = {
          name: '学历'
        };
      } else if (status === 'duty') {
        vm.create = {
          name: '职称'
        };
      } else if (status === 'identity') {
        vm.create = {
          name: '身份'
        };
      }
    }

    function save() {
      if (status == 'education') {
        UsersService
          .educationsCreate(vm.settings)
          .then(function (res) {
            toaster.pop('success', '添加成功');
            $uibModalInstance.close('cancel');
          })

      } else if (status == 'duty') {
        UsersService
          .titlesCreate(vm.settings)
          .then(function (res) {
            toaster.pop('success', '添加成功');
            $uibModalInstance.close('cancel');
          })

      } else if (status == 'identity') {
        UsersService
          .identitiesCreate(vm.settings)
          .then(function (res) {
            toaster.pop('success', '添加成功');
            $uibModalInstance.close('cancel');
          })

      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();
