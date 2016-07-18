/**
 * Created by yong on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .service('CoursesService', Service);

  /* @ngInject */
  function Service($http, ENDPOINT) {
    return {
      list: list,
      recommend: recommend,
      unRecommend: unRecommend,
      publish: publish,
      unPublish: unPublish,
      show: show,
      edit: edit,
      create: create,
      sections: sections,//获取章节列表
      sectionsCreate: sectionsCreate,//添加新章节,
      sectionsEdit: sectionsEdit,//更新章节
      sectionsDelete: sectionsDelete,//删除章节
      sectionsPublish: sectionsPublish,//发布章节
      sectionsUnpublish: sectionsUnpublish,//取消发布章节
      qiniuTokens: qiniuTokens,//获取七牛token
    };
    function qiniuTokens(data) {
      return $http({
        url: ENDPOINT + '/qiniu-tokens',
        method: 'POST',
        data: data
      })

    }

    function sections(id, params) {
      return $http({
        url: ENDPOINT + '/courses/' + id + '/sections',
        method: 'GET',
        params: params,
      })
    }

    function sectionsCreate(id, data) {
      return $http({
        url: ENDPOINT + '/courses/' + id + '/sections',
        method: 'POST',
        data: data,
      })
    }

    function sectionsEdit(id, data) {
      return $http({
        url: ENDPOINT + '/sections/' + id,
        method: 'PUT',
        data: data,

      })
    }

    function sectionsDelete(id) {
      return $http({
        url: ENDPOINT + '/sections/' + id,
        method: 'DELETE',
      })
    }

    function sectionsPublish(id) {
      return $http({
        url: ENDPOINT + '/sections/' + id + '/publish',
        method: 'POST',
      })
    }

    function sectionsUnpublish(id) {
      return $http({
        url: ENDPOINT + '/sections/' + id + '/unpublish',
        method: 'POST',
      })
    }

    function list(params) {
      return $http({
        url: ENDPOINT + '/courses',
        method: 'GET',
        params: params,
      })
    }

    function recommend(id) {
      return $http({
        url: ENDPOINT + '/courses/' + id + '/recommend',
        method: 'POST'
      })
    }

    function unRecommend(id) {
      return $http({
        url: ENDPOINT + '/courses/' + id + '/unrecommend',
        method: 'POST'
      })
    }

    function publish(id) {
      return $http({
        url: ENDPOINT + '/courses/' + id + '/publish',
        method: 'POST'
      })
    }

    function unPublish(id) {
      return $http({
        url: ENDPOINT + '/courses/' + id + '/unpublish',
        method: 'POST'
      })
    }

    function show(id) {
      return $http({
        url: ENDPOINT + '/courses/' + id,
        method: 'GET'
      })
    }

    function create(data) {
      return $http({
        url: ENDPOINT + '/courses',
        method: 'POST',
        data: data,
      })
    }

    function edit(id, data) {
      return $http({
        url: ENDPOINT + '/courses/' + id,
        method: 'PUT',
        data: data
      })
    }


  }
})();
