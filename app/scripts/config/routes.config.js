angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/courses/tab/list?status=published');
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'components/app/app.html',
        controller: 'AppController as app',
      })
      .state('app.courses', {
        url:'/courses',
        abstract: true,
        templateUrl: 'components/courses/layout.html',
      })
      .state('app.courses.tab', {
        url:'/tab',
        abstract: true,
        templateUrl: 'components/courses/list-tab.html',
      })
      .state('app.courses.tab.list', {
        url: '/list?status',
        templateUrl: 'components/courses/list.html',
        controller: 'CoursesListController as vm',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/auth/login.html',
        controller: 'LoginController as vm',
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
