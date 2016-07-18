/**
 * Created by yong on 16/6/16.
 */
(function () {

  'use strict';

  angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app.users', {
          url: '/users',
          abstract: true,
          templateUrl: 'components/users/layout.html',
        })
        .state('app.users.list', {
          url: '/list?status',
          templateUrl: 'components/users/list.html',
          controller: 'UsersListController as vm',
        })
        .state('app.users.settings', {
          url: '/settings',
          abstract: true,
          templateUrl: 'components/users/settings/layout.html',
          controller: 'UsersSettingsListController as vm',
        })
        .state('app.users.settings.list', {
          url: '/list?status',
          templateUrl: 'components/users/settings/list.html',
          controller: 'UsersSettingsListController as vm',
        })

    });
})();
