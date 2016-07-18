/**
 * Created by yong on 16/6/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('UsersListController', Controller);

  /* @ngInject */
  function Controller($stateParams, DTOptionsBuilder, DTColumnBuilder, $scope, $compile, $uibModal, UsersService, toaster) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.show = show;
    vm.publish = publish;
    vm.unpublish = unpublish;
    vm.filter = {
      register_start: null,
      register_end: null,
    };


    return init();

    function init() {
      var params = {
        limit: 1000
      };
      UsersService
        .identities(params)
        .then(function (res) {
          vm.identities = res.data.data;
        });
      UsersService
        .educations(params)
        .then(function (res) {
          vm.educations = res.data.data;
        });
      UsersService
        .titles(params)
        .then(function (res) {
          vm.titles = res.data.data;
        });
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
          [7, 'desc']
        ]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function (data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn('name').withTitle('姓名'),
        DTColumnBuilder.newColumn(null).withTitle('手机号').renderWith(function (data,type,full,meta) {
          if(full.mobile){
            full.mobile = full.mobile.substring(0,3) + '****' + full.mobile.substring(7,11);
          }else {
            full.mobile = '暂无手机号';
          }
          return full.mobile;
        }),
        DTColumnBuilder.newColumn('identity').withTitle('身份'),
        DTColumnBuilder.newColumn('title').withTitle('职称'),
        DTColumnBuilder.newColumn('education').withTitle('学历'),
        DTColumnBuilder.newColumn('org').withTitle('单位'),
        DTColumnBuilder.newColumn('created_at').withTitle('注册时间').renderWith(function (data) {
          return moment(data).format('YYYY-MM-DD');
        }),
        DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
          .renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      if (vm.status == 'publish') {
        angular.extend(params, vm.filter);
        if (vm.filter.register_start)
          params['register_start'] = vm.filter.register_start.format('YYYY-MM-DD');
        if (vm.filter.register_end)
          params['register_end'] = vm.filter.register_end.format('YYYY-MM-DD');
        params['disabled'] = false;
        UsersService
          .list(params)
          .then(function (res) {
            callback(convertDtResponse(res.data));
          });
      } else if (vm.status == 'pending') {
        params['disabled'] = true;
        UsersService
          .list(params)
          .then(function (res) {
            callback(convertDtResponse(res.data));
          });
      }
      // UsersService
      //   .list(params)
      //   .then(function(res) {
      //     callback(convertDtResponse(vm.users));
      //   });
      //callback(convertDtResponse(vm.users));
    }

    function actionsHtml(data, type, full, meta) {

      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="详情" ng-click="vm.show(' + data.id + ')">' +
        '   <i class="fa fa-fw fa-eye"></i>' +
        '</button>&nbsp;';

      if (vm.status === 'pending') {
        html += '<button class="btn btn-white btn-xs" uib-tooltip="启用" ng-click="vm.publish(' + data.id + ')">' +
          '   <i class="fa fa-fw fa-paper-plane-o"></i>' +
          '</button>&nbsp;';
      }

      if (vm.status === 'publish') {
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
      UsersService
        .publish(id)
        .then(function (res) {
          toaster.pop('success', '发布成功');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function unpublish(id) {
      UsersService
        .unpublish(id)
        .then(function (res) {
          toaster.pop('success', '用户已禁用');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function show(id) {
      $uibModal.open({
        animation: true,
        templateUrl: 'components/users/show.html',
        controller: 'UsersShowController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          id: id,
        }
      });
    }


  }
})();

