/**
 * Created by yong on 16/6/17.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .service('TeachersService', Service);

  /* @ngInject */
  function Service($http, ENDPOINT) {
    return {
      list: list,
      disable: disable,
      enable: enable,
      show: show,
      edit: edit,
      create: create,
    }

    function list(params) {
      return $http({
        url: ENDPOINT + '/teachers',
        method: 'GET',
        params: params,
      })
    }

    function disable(id) {
      return $http({
        url: ENDPOINT + '/teachers/' + id + '/disable',
        method: 'POST'
      })
    }

    function enable(id) {
      return $http({
        url: ENDPOINT + '/teachers/' + id + '/enable',
        method: 'POST'
      })
    }

    function show(id) {
      return $http({
        url: ENDPOINT + '/teachers/' + id,
        method: 'GET'
      })
    }

    function create(data) {
      return $http({
        url: ENDPOINT + '/teachers',
        method: 'POST',
        data: data,
      })
    }

    function edit(id, data) {
      return $http({
        url: ENDPOINT + '/teachers/' + id,
        method: 'PUT',
        data: data
      })
    }


  }
})();
