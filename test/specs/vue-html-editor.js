var assert = require("assert");
var Vue = require("vue");
var HtmlEditor = require("../../src/vue-html-editor.js");

var getVM = function(rootId, initText) {
  return Vue.extend({
    template: "<div><vue-html-editor v-ref:editor :model.sync='text'></vue-html-editor></div>",
    el: function() {
      var el = document.createElement("div");
      el.id = rootId;
      document.body.appendChild(el);
      return el;
    },
    components: {
      "vue-html-editor": HtmlEditor
    },
    data: function() {
      return {
        text: initText
      };
    }
  });
};

describe("vue-html-editor", function() {

  describe("static render", function() {

    it("initial text in editor", function(done) {
      var VM = getVM("static-render-inittext", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#static-render-inittext");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        assert.equal(vm.$refs.editor.control.summernote("code"), "Hello, World!");
        done();
      });
    });

    it("empty initial text", function(done) {
      var VM = getVM("static-render-empty", "");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#static-render-empty");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        assert.equal(vm.text, "");
        assert.equal(codearea.text(), "");
        assert.equal(vm.$refs.editor.control.summernote("code"), "");
        done();
      });
    });

    it("null initial text", function(done) {
      var VM = getVM("static-render-null", null);
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#static-render-null");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        assert.equal(vm.text, null);
        assert.equal(codearea.text(), "");
        assert.equal(vm.$refs.editor.control.summernote("code"), "");
        done();
      });
    });
  });

  describe("change the model", function() {

    it("change the model to normal value", function(done) {
      var VM = getVM("change-model-normal", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#change-model-normal");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        vm.text = "Ha Ha Ha.";
        vm.$nextTick(function() {
          assert.equal(vm.text, "Ha Ha Ha.");
          assert.equal(codearea.text(), "Ha Ha Ha.");
          assert.equal(vm.$refs.editor.control.summernote("code"), "Ha Ha Ha.");
          done();
        });
      });
    });

    it("change the model to empty string", function(done) {
      var VM = getVM("change-model-empty", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#change-model-empty");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        assert.equal(vm.$refs.editor.control.summernote("code"), "Hello, World!");
        vm.text = "";
        vm.$nextTick(function() {
          assert.equal(vm.text, "");
          assert.equal(codearea.text(), "");
          assert.equal(vm.$refs.editor.control.summernote("code"), "");
          done();
        });
      });
    });

    it("change the model to null value", function(done) {
      var VM = getVM("change-model-null", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#change-model-null");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        assert.equal(vm.$refs.editor.control.summernote("code"), "Hello, World!");
        vm.text = null;
        vm.$nextTick(function() {
          assert.equal(vm.text, null);
          assert.equal(codearea.text(), "");
          assert.equal(vm.$refs.editor.control.summernote("code"), "");
          done();
        });
      });
    });
  });

  describe("change the code", function() {
    it("change the code to normal value", function(done) {
      var VM = getVM("change-code-normal", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#change-code-normal");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        var control = vm.$refs.editor.control;
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        control.summernote("code", "Ha Ha Ha.");
        vm.$nextTick(function() {
          assert.equal(control.summernote("code"), "Ha Ha Ha.");
          assert.equal(vm.text, "Ha Ha Ha.");
          assert.equal(codearea.text(), "Ha Ha Ha.");
          done();
        });
      });
    });

    it("change the code to empty string", function(done) {
      var VM = getVM("change-code-empty", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#change-code-empty");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        var control = vm.$refs.editor.control;
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        control.summernote("code", "");
        vm.$nextTick(function() {
          assert.equal(control.summernote("code"), "");
          assert.equal(vm.text, null);
          assert.equal(codearea.text(), "");
          done();
        });
      });
    });

    it("change the code to null", function(done) {
      var VM = getVM("change-code-null", "Hello, World!");
      var vm = new VM();
      vm.$nextTick(function() {
        var root = $("#change-code-null");
        var editor = root.find(".note-editor");
        var codearea = editor.find(".note-editable");
        var control = vm.$refs.editor.control;
        assert.equal(vm.text, "Hello, World!");
        assert.equal(codearea.text(), "Hello, World!");
        control.summernote("code", null);
        vm.$nextTick(function() {
          assert.equal(control.summernote("code"), "");
          assert.equal(vm.text, null);
          assert.equal(codearea.text(), "");
          done();
        });
      });
    });
  });

  describe("set the height, minHeight, maxHeight", function() {
    describe("set to normal value", function() {
      it("set height", function(done) {
        var vm = new Vue({
          template: "<div><vue-html-editor v-ref:editor " +
                    ":height='200' " +
                    ":model.sync='text'></vue-html-editor></div>",
          el: function() {
            var el = document.createElement("div");
            document.body.appendChild(el);
            return el;
          },
          components: {
            "vue-html-editor": HtmlEditor
          },
          data: function() {
            return {
              text: null
            };
          }
        });
        vm.$nextTick(function() {
          assert.equal(vm.$refs.editor.height, 200);
          done();
        });
      });
      it("set minHeight", function(done) {
        var vm = new Vue({
          template: "<div><vue-html-editor v-ref:editor " +
                    ":min-height='50'" +
                    ":model.sync='text'></vue-html-editor></div>",
          el: function() {
            var el = document.createElement("div");
            document.body.appendChild(el);
            return el;
          },
          components: {
            "vue-html-editor": HtmlEditor
          },
          data: function() {
            return {
              text: null
            };
          }
        });
        vm.$nextTick(function() {
          assert.equal(vm.$refs.editor.minHeight, 50);
          done();
        });
      });
      it("set maxHeight", function(done) {
        var vm = new Vue({
          template: "<div><vue-html-editor v-ref:editor " +
                    ":max-height='1000' " +
                    ":model.sync='text'></vue-html-editor></div>",
          el: function() {
            var el = document.createElement("div");
            document.body.appendChild(el);
            return el;
          },
          components: {
            "vue-html-editor": HtmlEditor
          },
          data: function() {
            return {
              text: null
            };
          }
        });
        vm.$nextTick(function() {
          assert.equal(vm.$refs.editor.maxHeight, 1000);
          done();
        });
      });
    });

    describe("set to invalid value", function() {
      it("set height, min-height, max-height", function(done) {
        var vm = new Vue({
          template: "<div><vue-html-editor v-ref:editor " +
                    ":height='200' :min-height='250' :max-height='100' " +
                    ":model.sync='text'></vue-html-editor></div>",
          el: function() {
            var el = document.createElement("div");
            document.body.appendChild(el);
            return el;
          },
          components: {
            "vue-html-editor": HtmlEditor
          },
          data: function() {
            return {
              text: null
            };
          }
        });
        vm.$nextTick(function() {
          assert.equal(vm.$refs.editor.height, 200);
          assert.equal(vm.$refs.editor.minHeight, 200);
          assert.equal(vm.$refs.editor.maxHeight, 200);
          done();
        });
      });
    });
  });
});