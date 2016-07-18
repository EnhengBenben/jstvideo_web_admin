/**
 * Created by yong on 16/6/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('UsersSettingsListController', Controller);

  /* @ngInject */
  function Controller(UsersService, $stateParams, DTOptionsBuilder, DTColumnBuilder, $scope, $compile, $uibModal, toaster) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.edit = edit;
    vm.create = create;
    vm.remove = remove;

    return init();

    function init() {
      initDt();

      $scope.$watch('vm.filter', function (newValue, oldValue) {
        if (newValue != oldValue) {
          vm.dtInstance.reloadData();
        }
      }, true);
    }

    function initDt() {
      vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', dtAjax)
        .withDataProp('data')
        .withOption('createdRow', createdRow)
        .withOption('order', [
          [1, 'desc']
        ]);

      if (vm.status === 'identity') {
        vm.dtColumns = [
          DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function (data, type, full, meta) {
            return meta.row + meta.settings.oAjaxData.start + 1;
          }),
          DTColumnBuilder.newColumn('name').withTitle('身份'),
          DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '80px').notSortable()
            .renderWith(actionsHtml)
        ];
      } else if (vm.status === 'education') {
        vm.dtColumns = [
          DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function (data, type, full, meta) {
            return meta.row + meta.settings.oAjaxData.start + 1;
          }),
          DTColumnBuilder.newColumn('name').withTitle('学历'),
          DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '80px').notSortable()
            .renderWith(actionsHtml)
        ];
      } else if (vm.status === 'duty') {
        vm.dtColumns = [
          DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function (data, type, full, meta) {
            return meta.row + meta.settings.oAjaxData.start + 1;
          }),
          DTColumnBuilder.newColumn('name').withTitle('职称'),
          DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '80px').notSortable()
            .renderWith(actionsHtml)
        ];
      }

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      if (vm.status === 'identity') {
        UsersService
          .identities(params)
          .then(function (res) {
            vm.identity = res.data;
            callback(convertDtResponse(vm.identity));
          });
      } else if (vm.status === 'education') {
        UsersService
          .educations(params)
          .then(function (res) {
            vm.education = res.data;
            callback(convertDtResponse(vm.education));
          });
      } else if (vm.status === 'duty') {
        UsersService
          .titles(params)
          .then(function (res) {
            vm.duty = res.data;
            callback(convertDtResponse(vm.duty));
          });
      }
    }

    function actionsHtml(data, type, full, meta) {

      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ng-click="vm.edit(' + data.id + ')">' +
        '   <i class="fa fa-pencil-square-o"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="删除" confirm="是否确定删除该数据?" ng-click="vm.remove(' + data.id + ')">' +
        '   <i class="fa fa-trash-o" aria-hidden="true"></i>' +
        '</button>&nbsp;';

      return html;
    }

    // function statusHtml(data, type, full, meta) {
    //   var statusDescr = {
    //     canceled: '已取消',
    //     pending: '待审核',
    //     publish: '报名中',
    //     ongoing: '上课中',
    //     closed: '已结束'
    //   };
    //   return statusDescr[data];
    // }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }


    function remove(id) {
      if (vm.status === 'identity') {
        UsersService
          .identitiesDelete(id)
          .then(function (res) {
            toaster.pop('success', '已删除');
            vm.dtInstance.reloadData(null, false);
          })
      } else if (vm.status === 'education') {
        UsersService
          .educationsDelete(id)
          .then(function (res) {
            toaster.pop('success', '已删除');
            vm.dtInstance.reloadData(null, false);
          })
      } else if (vm.status === 'duty') {
        UsersService
          .titlesDelete(id)
          .then(function (res) {
            toaster.pop('success', '已删除');
            vm.dtInstance.reloadData(null, false);
          })
      }
    }

    function create() {
      $uibModal.open({
        animation: true,
        templateUrl: 'components/users/settings/create.html',
        controller: 'UsersSettingsCreateController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          status: function () {
            return vm.status;
          }
        }
      }).result.then(function () {
        vm.dtInstance.reloadData(null, true);
      });
    }

    function edit(id) {
      if (vm.status === 'identity') {
        vm.settings = vm.identity.data;
      } else if (vm.status === 'education') {
        vm.settings = vm.education.data;
      } else if (vm.status === 'duty') {
        vm.settings = vm.duty.data;
      }
      angular.forEach(vm.settings, function (i) {
        if (i.id === id) {
          $uibModal.open({
            animation: true,
            templateUrl: 'components/users/settings/edit.html',
            controller: 'UsersSettingsEditController',
            controllerAs: 'vm',
            size: 'md',
            resolve: {
              id: id,
              status: function () {
                return vm.status;
              },
              name: function () {
                return i.name;
              }
            }
          }).result.then(function () {
            vm.dtInstance.reloadData(null, true);
          });
        }
      });

    }


  }
})();

