/**
 * Created by yong on 16/6/20.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CoursesPageController', Controller);

  /* @ngInject */
  function Controller($state, $stateParams, DTOptionsBuilder, DTColumnBuilder, $scope, $compile, $uibModal, CoursesService, $localStorage, toaster) {
    var vm = this;
    vm.title = 'Controller';
    vm.coursesId = $stateParams.id;
    vm.create = create;
    vm.edit = edit;
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
          [1, 'asc']
        ]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function (data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn('sort').withTitle('章节顺序'),
        DTColumnBuilder.newColumn('name').withTitle('章节名称'),
        DTColumnBuilder.newColumn(null).withTitle('老师').renderWith(function (data, type, full, meta) {
          var name = '';
          if (full.teachers.data) {
            angular.forEach(full.teachers.data, function (i) {
              name += i.name + ' ';
            })
            if (name != '') {
              return name;
            } else {
              return '暂无老师';
            }
          }
        }),
        DTColumnBuilder.newColumn('length').withTitle('视频时长').renderWith(function (data) {
          if(data == 0){
            return '暂无视频';
          }else if(data < 60){
            return data + '秒';
          }else if(data < 3600){
            return (parseInt(data/60) + '分' + data%60 + '秒');
          }else if(data >=3600){
            return (parseInt(data/3600) + '小时' + parseInt(data/60) + '分' + data%60 + '秒');
          }
        }),
        DTColumnBuilder.newColumn('updated_at').withTitle('更新时间').renderWith(function (data) {
          return moment(data).format('YYYY-MM-DD');
        }),
        DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '80px').notSortable()
          .renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      params['include'] = 'teachers,videos';
      CoursesService
        .sections($stateParams.id, params)
        .then(function (res) {
          vm.seations = res.data.data;
          callback(convertDtResponse(res.data));
        });
      //callback(convertDtResponse(vm.users));
    }

    function actionsHtml(data, type, full, meta) {
      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ng-click="vm.edit(' + data.id + ')">' +
        '   <i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="视频" ui-sref="app.courses.video({id: ' + data.id + ',coursesId: ' + vm.coursesId + '})">' +
        '   <i class="fa fa-video-camera" aria-hidden="true"></i>' +
        '</button>&nbsp;';

      if (vm.status === 'pending') {
        html += '<button class="btn btn-white btn-xs" uib-tooltip="发布" ng-click="vm.publish(' + data.id + ')">' +
          '   <i class="fa fa-fw fa-paper-plane-o"></i>' +
          '</button>&nbsp;';
      }

      if (vm.status === 'published') {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="取消发布" ng-click="vm.unpublish(' + data.id + ')">' +
          '   <i class="fa fa-undo" aria-hidden="true"></i>' +
          '</button>&nbsp;'
      }
      html += '<button class="btn btn-white btn-xs" uib-tooltip="删除" confirm="确定执行改操作?" ng-click="vm.remove(' + data.id + ')">' +
        '   <i class="fa fa-trash-o" aria-hidden="true"></i>' +
        '</button>&nbsp;'
      return html;
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function create() {
      $state.go('app.courses.create-page', {
        id: $stateParams.id
      })
    }

    function edit(id) {
      angular.forEach(vm.seations, function (i) {
        if (i.id == id) {
          vm.showSeation = i;
        }
      });
      $localStorage.edit = vm.showSeation
      $state.go('app.courses.edit-page', {
        id: id,
        coursesId: vm.coursesId
      });
    }


    function remove(id) {
      CoursesService
        .sectionsDelete(id)
        .then(function (res) {
          toaster.pop('success', '已删除');
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
