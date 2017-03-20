// Karma configuration
// Generated on Wed Mar 15 2017 11:51:56 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/material-wizard/dist/material-wizard.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-encode-uri/dist/angular-encode-uri.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-pdf/dist/angular-pdf.js',
      'bower_components/angular-swfobject/angular-swfobject.js',
      'bower_components/isteven-angular-multiselect/isteven-multi-select.js',
      'bower_components/angular-fixed-table-header/src/fixed-table-header.min.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-auto-height/dist/auto-height.js',
      'bower_components/angular-img-fallback/angular.dcb-img-fallback.min.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',



       'app/src//**/*module.js',

       'app/src/app.module.js',
      'app/src//**/*.js',

      { pattern: 'app/tests/unit/SiteController.test.js' }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],




    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
