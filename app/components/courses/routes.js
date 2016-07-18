/**
 * Created by yong on 16/6/17.
 */
angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.courses.create', {
        url: '/create',
        templateUrl: 'components/courses/create.html',
        controller: 'CoursesCreateController as vm',
      })
      .state('app.courses.edit', {
        url: '/edit/:id',
        templateUrl: 'components/courses/edit.html',
        controller: 'CoursesEditController as vm',
      })
      .state('app.courses.page', {
        url: '/:id/page',
        templateUrl: 'components/courses/page.html',
        controller: 'CoursesPageController as vm',
      })
      .state('app.courses.create-page', {
        url: '/:id/create-page',
        templateUrl: 'components/courses/page-create.html',
        controller: 'CoursesPageCreateController as vm',
      })
      .state('app.courses.edit-page', {
        url: '/:coursesId/edit-page/:id',
        templateUrl: 'components/courses/page-edit.html',
        controller: 'CoursesPageEditController as vm',
      })
      .state('app.courses.video', {
        url: '/:coursesId/video/:id',
        templateUrl: 'components/courses/video.html',
        controller: 'CoursesVideoController as vm',
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
