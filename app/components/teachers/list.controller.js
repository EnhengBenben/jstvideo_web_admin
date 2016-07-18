/**
 * Created by yong on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('TeachersListController', Controller);

  /* @ngInject */
  function Controller($stateParams, DTOptionsBuilder, DTColumnBuilder, $scope, $compile, $uibModal, TeachersService, toaster, $localStorage) {
    var vm = this;
    vm.title = 'Controller';

    vm.status = $stateParams.status;
    vm.publish = publish;
    vm.unpublish = unpublish;
    vm.show = show;

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
          [3, 'desc']
        ]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function (data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn(null).withTitle('姓名').withOption('width', '68px').renderWith(function (data, type, full, meta) {
          return '<a ng-click="vm.show(' + full.id + ')">' + full.name + '</a>'
        }),
        DTColumnBuilder.newColumn('org').withTitle('单位'),
        DTColumnBuilder.newColumn('title').withTitle('职称'),
        DTColumnBuilder.newColumn('courses_count').withTitle('课程').withOption('width', '45px'),
        DTColumnBuilder.newColumn('thumbups_count').withTitle('赞').withOption('width', '45px'),
        DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '80px').notSortable()
          .renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      if (vm.status == 'published') {
        params['disabled'] = false;
      }
      if (vm.status == 'pending') {
        params['disabled'] = true;
      }
      TeachersService.list(params)
        .then(function (res) {
          vm.teachers = res.data.data;
          callback(convertDtResponse(res.data));
        });
      //callback(convertDtResponse(vm.users));
    }

    function actionsHtml(data, type, full, meta) {

      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ui-sref="app.teachers.edit({id:' + full.id + '})">' +
        '   <i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
        '</button>&nbsp;';

      if (vm.status === 'pending') {
        html += '<button class="btn btn-white btn-xs" uib-tooltip="启用" ng-click="vm.publish(' + data.id + ')">' +
          '   <i class="fa fa-fw fa-paper-plane-o"></i>' +
          '</button>&nbsp;';
      }

      if (vm.status === 'published') {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="禁用" ng-click="vm.unpublish(' + data.id + ')">' +
          '   <i class="fa fa-fw fa-ban"></i>' +
          '</button>&nbsp;'
      }

      return html;
    }


    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function publish(id) {
      TeachersService
        .enable(id)
        .then(function (res) {
          toaster.pop('success', '启用成功');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function unpublish(id) {
      TeachersService
        .disable(id)
        .then(function (res) {
          toaster.pop('success', '禁用成功');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function show(id) {
      angular.forEach(vm.teachers, function (i) {
        if (id == i.id) {
          $localStorage.teachers = i;
        }
      });
      $uibModal.open({
        animation: true,
        templateUrl: 'components/teachers/show.html',
        controller: 'TeachersShowController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          id: id,
        }
      }).result.then(function () {
        vm.dtInstance.reloadData(null, false);
      });
    }
  }
})();
