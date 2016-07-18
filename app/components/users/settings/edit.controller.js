/**
 * Created by yong on 16/6/20.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('UsersSettingsEditController', Controller);

  /* @ngInject */
  function Controller(id, status, name, UsersService, toaster, $uibModalInstance) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    vm.settings = {
      name: name,
    };
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
          .educationsEdit(id, vm.settings)
          .then(function (res) {
            toaster.pop('success', '保存成功');
            $uibModalInstance.close('cancel');
          })

      } else if (status == 'duty') {
        UsersService
          .titlesEdit(id, vm.settings)
          .then(function (res) {
            toaster.pop('success', '保存成功');
            $uibModalInstance.close('cancel');
          })

      } else if (status == 'identity') {
        UsersService
          .identitiesEdit(id, vm.settings)
          .then(function (res) {
            toaster.pop('success', '保存成功');
            $uibModalInstance.close('cancel');
          })

      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();
