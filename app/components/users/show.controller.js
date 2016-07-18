/**
 * Created by yong on 16/6/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('UsersShowController', Controller);

  /* @ngInject */
  function Controller(id, UsersService, $uibModalInstance) {
    var vm = this;
    vm.cancel = cancel;

    return init();

    function init() {

      UsersService
        .show(id)
        .then(function (res) {
          vm.user = res.data.data;
          if (vm.user.disabled_at) {
            vm.user.status = '已禁用';
          } else {
            vm.user.status = '正式用户';
          }
        })

    }

    function cancel() {
      $uibModalInstance.close('cancel');
    }

  }
})();
