//  Gulp building scripts
var gulp = require("gulp");
var del = require("del");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var runSequence = require("run-sequence");
var Server = require('karma').Server;
var pkg = require("./package.json");
var dirs = pkg.configs.directories;

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task("clean", function (done) {
  del([ dirs.dist, dirs.coverage ]);
  done();
});

gulp.task("webpack-dev", function(done) {
  // modify some webpack config options
  var webpackDevConfig = Object.create(webpackConfig);
  webpackDevConfig.devtool = "sourcemap";
  webpackDevConfig.debug = true;
  // create a single instance of the compiler to allow caching
  var webpackDevCompiler = webpack(webpackDevConfig);
  // run webpack
  webpackDevCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    done();
  });
});

gulp.task("webpack", function(done) {
  // modify some webpack config options
  var webpackProdConfig = Object.create(webpackConfig);
  webpackProdConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      // This has effect on the react lib size
      "NODE_ENV": JSON.stringify("production")
    }
  }), new webpack.optimize.UglifyJsPlugin());
  webpackProdConfig.output.filename = "[name].min.js";
  // run webpack
  webpack(webpackProdConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    done();
  });
});

gulp.task('test', function(done) {
  // Be sure to return the stream
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:coverage', function(done) {
  // Be sure to return the stream
  process.env.TEST_TYPE = "coverage";
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:coveralls', function(done) {
  // Be sure to return the stream
  process.env.TEST_TYPE = "coveralls";
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task("build-dev", function (done) {
  runSequence(
    "clean",
    "test:coverage",
    "webpack-dev",
  done);
});

gulp.task("build", function (done) {
  runSequence(
    "clean",
    "test:coveralls",
    "webpack-dev",
    "webpack",
  done);
});

gulp.task("default", ["build"]);