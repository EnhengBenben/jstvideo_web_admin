(function () {
'use strict';

angular
    .module('app')
    .config(configHttpProvider);

/* @ngInject */
function configHttpProvider($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.get = {
    Accept: 'application/vnd.cma.v1+json',
  };
  $httpProvider.defaults.headers.post.Accept = 'application/vnd.cma.v1+json';
}
})();
