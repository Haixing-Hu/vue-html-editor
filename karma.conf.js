// Karma configuration
var VueLoader = require('vue-loader');

module.exports = function (config) {
  var settings = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      "./lib/jquery/dist/jquery.min.js",
      "./lib/bootstrap/dist/js/bootstrap.min.js",
      "./lib/summernote/dist/summernote.min.js",
      "./test/specs/**/*.js"
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "./test/**/*.js": ['webpack', 'sourcemap'],
      "./src/**/*.js": ['webpack', 'sourcemap', 'coverage']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.vue$/, loader: "vue"
        }],
        postLoaders: [{
          test: /\.js$/,
          exclude: /test|node_modules|lib/,
          loader: 'istanbul-instrumenter'
        }]
      },
      vue: {
        loaders: {
          html: "raw"    // use raw-loader to process HTML
        }
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    /*
    reporters: [
      'mocha', 'coverage'
    ],

    coverageReporter: {
      reporters: [{
        type: 'html', dir: '../coverage'
      }, {
        type: 'lcov', dir: '../coverage'
      }, {
        type: 'text-summary', dir: '../coverage'
      }]
    },
    */

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  };

  switch (process.env.TEST_TYPE) {
    case 'coverage':
      settings.browsers = ['PhantomJS'];
      settings.reporters = ['coverage'];
      settings.coverageReporter = {
        reporters: [{
          type: 'text-summary', dir: "./coverage"
        }, {
          type: 'html', dir: "./coverage"
        }]
      };
      break;
    case 'coveralls':
      settings.browsers = ['PhantomJS'];
      settings.reporters = ['coverage', 'coveralls'];
      settings.coverageReporter = {
        reporters: [{
          type: 'text-summary', dir: "./coverage"
        }, {
          type: 'lcov', dir: "./coverage"
        }]
      };
      break;
    case 'sauce':
      var batch = process.env.SAUCE || 'batch1';
      var sauce = require('./sauce')[batch];
      settings.sauceLabs = sauce.sauceLabs;
      settings.captureTimeout = sauce.captureTimeout;
      settings.customLaunchers = sauce.customLaunchers;
      settings.browsers = sauce.browsers;
      settings.reporters = sauce.reporters;
      break;
    case 'browser':
      settings.browsers = ['Chrome', 'Safari', 'Firefox'];
      settings.reporters = ['progress'];
      break;
    default:
      settings.browsers = ['PhantomJS'];
      settings.reporters = ['mocha'];
      break;
  }

  config.set(settings);
};
