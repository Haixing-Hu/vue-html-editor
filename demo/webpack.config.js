//  Configuration file of webpack
var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var pkg = require("../package.json");
var dirs = pkg.configs.directories;
var version = process.env.VERSION || pkg.version;
var banner = pkg.name + " v" + version + "\n" +
  "(c) " + new Date().getFullYear() +
  " " + pkg.author.name + "\n" +
  "Released under the " + pkg.license + " License.";
var VueLoader = require('vue-loader');

module.exports = {
  entry: {
    "demo": path.join(__dirname, "demo.js")
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" }
    ]
  },
  vue: {
    loaders: {
      html: "raw"    // use raw-loader to process HTML
    }
  },
  resolve: {
    root: [__dirname],
    modulesDirectories: [ "lib" ]
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new BowerWebpackPlugin({
      modulesDirectories: [ "lib" ],
      manifestFiles:      "bower.json",
      includes:           /.*/,
      excludes:           [],
      searchResolveModulesDirectories: true
    }),
    new webpack.BannerPlugin(banner)
  ],
  output: {
    path: __dirname,
    filename: "[name].all.js",
    sourceMapFilename: "[file].map"
  },
};
