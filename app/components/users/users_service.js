/**
 * Created by yong on 16/6/16.
 */
(function () {

  'use strict';

  angular
    .module('app')
    .service('UsersService', service);

  /* @ngInject */

  function service($http, ENDPOINT) {
    return {
      list: list,//用户列表
      show: show,//用户详情
      publish: publish,//启用用户
      unpublish: unpublish,//禁用用户
      educations: educations,//学历列表
      educationsEdit: educationsEdit,//学历编辑
      educationsCreate: educationsCreate,//学历添加
      educationsDelete: educationsDelete,//学历删除
      identities: identities,//身份列表
      identitiesEdit: identitiesEdit,//身份编辑
      identitiesCreate: identitiesCreate,//身份添加
      identitiesDelete: identitiesDelete,//身份删除
      titles: titles,//职称列表
      titlesEdit: titlesEdit,//职称编辑
      titlesCreate: titlesCreate,//职称创建
      titlesDelete: titlesDelete,//职称删除
    }


    function list(params) {
      return $http({
        url: ENDPOINT + '/users',
        method: 'GET',
        params: params
      })
    }

    function show(id) {
      return $http({
        url: ENDPOINT + '/users/' + id,
        method: 'GET'
      })
    }

    function publish(id) {
      return $http({
        url: ENDPOINT + '/users/' + id + '/enable',
        method: 'POST'
      })
    }

    function unpublish(id) {
      return $http({
        url: ENDPOINT + '/users/' + id + '/disable',
        method: 'POST'
      })
    }

    function educations(params) {
      return $http({
        url: ENDPOINT + '/educations',
        method: 'GET',
        params: params
      })
    }

    function educationsEdit(id, data) {
      return $http({
        url: ENDPOINT + '/educations/' + id,
        method: 'PUT',
        data: data
      })
    }

    function educationsCreate(data) {
      return $http({
        url: ENDPOINT + '/educations',
        method: 'POST',
        data: data
      })
    }

    function educationsDelete(id) {
      return $http({
        url: ENDPOINT + '/educations/' + id,
        method: 'DELETE',
      })
    }

    function identities(params) {
      return $http({
        url: ENDPOINT + '/identities',
        method: 'GET',
        params: params
      })
    }

    function identitiesEdit(id, data) {
      return $http({
        url: ENDPOINT + '/identities/' + id,
        method: 'PUT',
        data: data
      })
    }

    function identitiesCreate(data) {
      return $http({
        url: ENDPOINT + '/identities',
        method: 'POST',
        data: data,
      })
    }

    function identitiesDelete(id) {
      return $http({
        url: ENDPOINT + '/identities/' + id,
        method: 'DELETE',
      })
    }

    function titles(params) {
      return $http({
        url: ENDPOINT + '/titles',
        method: 'GET',
        params: params,
      })
    }

    function titlesEdit(id, data) {
      return $http({
        url: ENDPOINT + '/titles/' + id,
        method: 'PUT',
        data: data
      })
    }

    function titlesCreate(data) {
      return $http({
        url: ENDPOINT + '/titles',
        method: 'POST',
        data: data,
      })
    }

    function titlesDelete(id) {
      return $http({
        url: ENDPOINT + '/titles/' + id,
        method: 'DELETE',
      })
    }

  }

})();
