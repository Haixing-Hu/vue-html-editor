var Vue = require("vue");

var vm = new Vue({
  el: "#app",
  components: {
    "vue-html-editor": require("../src/vue-html-editor.js")
  },
  data: {
    text: "Hello World!"
  }
});

var editor = vm.$refs.editor;
editor.$on('input', function(inputed) {
  vm.$data.text = inputed;
});
