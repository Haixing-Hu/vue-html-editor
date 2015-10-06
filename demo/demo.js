var Vue = require("vue");

var vm = new Vue({
  el: "#app",
  components: {
    "vue-html-editor": require("../src/vue-html-editor.vue")
  },
  data: {
    text: "Hello World!"
  }
});
