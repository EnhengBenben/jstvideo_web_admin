/**
 * Created by yong on 16/6/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CoursesListController', Controller);

  /* @ngInject */
  function Controller($stateParams, DTOptionsBuilder, DTColumnBuilder, $scope, $compile, $uibModal, CoursesService, toaster) {
    var vm = this;
    vm.title = 'Controller';
    vm.status = $stateParams.status;
    vm.publish = publish;
    vm.unpublish = unpublish;
    vm.recommend = recommend;
    vm.unRecommend = unRecommend;

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
        DTColumnBuilder.newColumn('name').withTitle('课程名称'),
        DTColumnBuilder.newColumn('length').withTitle('总时长').renderWith(function (data) {
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
        DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '120px').notSortable()
          .renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      if (vm.status == 'published') {
        params['published'] = true
      } else if (vm.status == 'pending') {
        params['published'] = false
      } else if (vm.status == 'recorded') {
        params['recommended'] = true;
      }
      CoursesService.list(params)
        .then(function (res) {
          callback(convertDtResponse(res.data));
        });
    }

    function actionsHtml(data, type, full, meta) {
      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="章节" ui-sref="app.courses.page({id: ' + data.id + '})">' +
        '   <i class="fa fa-file-text-o" aria-hidden="true"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="修改" ui-sref="app.courses.edit({id: ' + data.id + '})">' +
        '   <i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
        '</button>&nbsp;';
      if (!data.recommended_at) {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="推荐" ng-click="vm.recommend(' + data.id + ')">' +
          '   <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>' +
          '</button>&nbsp;'
      }
      if (data.recommended_at) {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="取消推荐" ng-click="vm.unRecommend(' + data.id + ')">' +
          '   <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>' +
          '</button>&nbsp;'
      }
      if (!data.published_at) {
        html += '<button class="btn btn-white btn-xs" uib-tooltip="发布" ng-click="vm.publish(' + data.id + ')">' +
          '   <i class="fa fa-fw fa-paper-plane-o"></i>' +
          '</button>&nbsp;';
      }
      if (data.published_at) {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="取消发布" ng-click="vm.unpublish(' + data.id + ')">' +
          '   <i class="fa fa-undo" aria-hidden="true"></i>' +
          '</button>&nbsp;'
      }

      return html;
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function publish(id) {
      CoursesService
        .publish(id)
        .then(function (res) {
          toaster.pop('success', '发布成功');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function unpublish(id) {
      CoursesService
        .unPublish(id)
        .then(function (res) {
          toaster.pop('success', '取消发布成功');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function recommend(id) {
      CoursesService
        .recommend(id)
        .then(function (res) {
          toaster.pop('success', '推荐成功');
          vm.dtInstance.reloadData(null, false);
        })

    }

    function unRecommend(id) {
      CoursesService
        .unRecommend(id)
        .then(function (res) {
          toaster.pop('success', '已取消推荐');
          vm.dtInstance.reloadData(null, false);
        })
    }


    function remove(courseId) {
      CourseService.remove(courseId)
        .then(function () {
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
      }).result.then(function () {
        vm.dtInstance.reloadData(null, false);
      });
    }
  }
})();
