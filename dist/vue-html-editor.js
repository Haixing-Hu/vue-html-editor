/*!
 * vue-html-editor v0.2.0
 * (c) 2016 Haixing Hu
 * Released under the MIT License.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * A HTML editor control based on the summernote plugin.
	 *
	 * @param model
	 *    the model bind to the control, which must be a two way binding variable.
	 * @param language
	 *    the optional language code. Default value is "en-US".
	 * @param height
	 *    the optional height of the HTML editor. Default value is 160.
	 * @param minHeight
	 *    the optional minimum height of the HTML editor. Default value is 160.
	 * @param maxHeight
	 *    the optional maximum height of the HTML editor. Default value is 800.
	 *    A null value indicates no limitation.
	 * @param name
	 *    the optional name of the textarea control.
	 * @param toolbar
	 *    the optional configuration of toolbar buttons. Default value is
	 *     [["font", ["bold", "italic", "underline", "clear"]],
	 *      ["fontsize", ["fontsize"]],
	 *      ["para", ["ul", "ol", "paragraph"]],
	 *      ["color", ["color"]],
	 *      ["insert", ["link", "picture", "hr"]]]
	 * @author Haixing Hu
	 */
	module.exports = {
	  replace: true,
	  inherit: false,
	  template: "<textarea class='form-control' :name='name'></textarea>",
	  props: {
	    model: {
	      required: true,
	      twoWay: true
	    },
	    language: {
	      type: String,
	      required: false,
	      default: "en-US"
	    },
	    height: {
	      type: Number,
	      required: false,
	      default: 160
	    },
	    minHeight: {
	      type: Number,
	      required: false,
	      default: 160
	    },
	    maxHeight: {
	      type: Number,
	      required: false,
	      default: 800
	    },
	    name: {
	      type: String,
	      required: false,
	      default: ""
	    },
	    toolbar: {
	      type: Array,
	      required: false,
	      default: function() {
	        return [
	          ["font", ["bold", "italic", "underline", "clear"]],
	          ["fontsize", ["fontsize"]],
	          ["para", ["ul", "ol", "paragraph"]],
	          ["color", ["color"]],
	          ["insert", ["link", "picture", "hr"]]
	        ];
	      }
	    }
	  },
	  beforeCompile: function() {
	    this.isChanging = false;
	    this.control = null;
	  },
	  ready: function() {
	    //  initialize the summernote
	    if (this.minHeight > this.height) {
	      this.minHeight = this.height;
	    }
	    if (this.maxHeight < this.height) {
	      this.maxHeight = this.height;
	    }
	    var me = this;
	    this.control = $(this.$el);
	    this.control.summernote({
	      lang: this.language,
	      height: this.height,
	      minHeight: this.minHeight,
	      maxHeight: this.maxHeight,
	      toolbar: this.toolbar,
	      callbacks: {
	        onInit: function() {
	          me.control.summernote("code", me.model);
	        }
	      }
	    }).on("summernote.change", function() {
	      // Note that we do not use the "onChange" options of the summernote
	      // constructor. Instead, we use a event handler of "summernote.change"
	      // event because that I don't know how to trigger the "onChange" event
	      // handler after changing the code of summernote via ".summernote('code')" function.
	      if (! me.isChanging) {
	        me.isChanging = true;
	        var code = me.control.summernote("code");
	        me.model = (code === null || code.length === 0 ? null : code);
	        me.$nextTick(function () {
	          me.isChanging = false;
	        });
	      }
	    });
	  },
	  watch: {
	    "model": function (val, oldVal) {
	      if (! this.isChanging) {
	        this.isChanging = true;
	        var code = (val === null ? "" : val);
	        this.control.summernote("code", code);
	        this.isChanging = false;
	      }
	    }
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=vue-html-editor.js.map