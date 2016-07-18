// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-11-07 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-i18n/angular-locale_zh-hans-cn.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/metisMenu/dist/metisMenu.js',
      'bower_components/chosen/chosen.jquery.min.js',
      'bower_components/angular-chosen-localytics/chosen.js',
      'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
      'bower_components/datatables.net/js/jquery.dataTables.js',
      'bower_components/angular-datatables/dist/angular-datatables.js',
      'bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
      'bower_components/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.js',
      'bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js',
      'bower_components/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.js',
      'bower_components/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.js',
      'bower_components/angular-datatables/dist/plugins/fixedcolumns/angular-datatables.fixedcolumns.js',
      'bower_components/angular-datatables/dist/plugins/fixedheader/angular-datatables.fixedheader.js',
      'bower_components/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
      'bower_components/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.js',
      'bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
      'bower_components/angular-datatables/dist/plugins/select/angular-datatables.select.js',
      'bower_components/datatables.net-bs/js/dataTables.bootstrap.js',
      'bower_components/moment/moment.js',
      'bower_components/moment/locale/zh-cn.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/angular-datepicker/dist/angular-datepicker.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/AngularJS-Toaster/toaster.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/summernote/dist/summernote.js',
      'bower_components/summernote/lang/summernote-zh-CN.js',
      'bower_components/angular-summernote/dist/angular-summernote.js',
      'bower_components/plupload/js/plupload.full.min.js',
      'bower_components/plupload/js/moxie.js',
      'bower_components/qiniu/src/qiniu.js',
      'bower_components/qiniu/demo/scripts/ui.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
