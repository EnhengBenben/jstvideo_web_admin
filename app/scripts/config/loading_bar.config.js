(function () {
'use strict';

angular
    .module('app')
    .config(configLoadingBar);

/* @ngInject */
function configLoadingBar(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}
})();
