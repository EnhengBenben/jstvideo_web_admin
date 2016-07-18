/**
 * Created by yong on 16/6/17.
 */
angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.teachers', {
        url: '/teachers',
        abstract: true,
        templateUrl: 'components/teachers/layout.html',
      })
      .state('app.teachers.tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'components/teachers/list-tab.html',
      })
      .state('app.teachers.tab.list', {
        url: '/list?status',
        templateUrl: 'components/teachers/list.html',
        controller: 'TeachersListController as vm',
      })
      .state('app.teachers.create', {
        url: '/create',
        templateUrl: 'components/teachers/create.html',
        controller: 'TeachersCreateController as vm',
      })
      .state('app.teachers.edit', {
        url: '/edit/:id',
        templateUrl: 'components/teachers/edit.html',
        controller: 'TeachersEditController as vm',
      })
      .state('app.teachers.show', {
        url: '/show/:id',
        templateUrl: 'components/teachers/show.html',
        controller: 'TeachersShowController as vm',
      });

    // $stateProvider
    //   .state('app', {
    //     abstract: true,
    //     templateUrl: 'components/app/app.html',
    //     controller: 'AppController as app',
    //   })
    //   .state('app.dashboard', {
    //     url: '/dashboard',
    //     templateUrl: 'components/dashboard/dashboard.html',
    //     controller: 'DashboardController as vm',
    //   });
  });
