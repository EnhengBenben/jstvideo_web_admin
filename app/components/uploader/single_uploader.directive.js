(function() {
  'use strict';

  angular
    .module('app')
    .directive('singleUploader', directive);

  /**
   * 单个文件上传Directive
   * 使用方式：
   * ``` html
   * 	<single-uploader url="vm.image.url"></single-uploader>
   * 	<single-uploader url="vm.image.url" name="vm.image.name" attachment-id="vm.image.attachmentId"></single-uploader>
   * ```
   * @return {object} Directive
   */
  function directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/uploader/single_uploader.directive.html',
      scope: {
        'url': '=url',
        'name': '=?name',
        'attachmentId': '=?attachmentId'
      },
      controller: Controller
    };

    return directive;
  }

  Controller.$inject = ['$scope', '$http', 'FileUploader', 'ENDPOINT','$localStorage'];

  /* @ngInject */
  function Controller($scope, $http, FileUploader, ENDPOINT,$localStorage) {
    if($localStorage.token){
      $scope.uploader = new FileUploader({
        url: ENDPOINT + '/files',
        method: 'POST',
        headers:{'Authorization':'Bearer' + $localStorage.token},
        autoUpload: true,
        removeAfterUpload: true,
        onSuccessItem: function(item, response, status, headers) {
          $scope.url = response.data.file.url;
          $scope.name = response.data.file.name;
          $scope.attachmentId = response.data.file['attachment_id'];
        }
      });
    }
  }
})();
