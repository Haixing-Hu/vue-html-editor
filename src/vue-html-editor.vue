<template>
  <textarea class="form-control"></textarea>
</template>

<script>
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
    //console.debug("html-editor.ready");
    //  initialize the summernote
    var me = this;
    this.control = $(this.$el);
    this.control.summernote({
      lang: this.language,
      height: this.height,
      minHeight: this.minHeight,
      maxHeight: this.maxHeight,
      toolbar: this.toolbar,
      onInit: function() {
        me.control.code(me.model);
      },
      onChange: function() {
        if (! me.isChanging) {
          me.isChanging = true;
          me.model = me.control.code();
          me.$nextTick(function () {
            me.isChanging = false;
            //console.debug("html-editor.onChange: set model = " + me.model);
          });
        }
      }
    });
  },
  watch: {
    "model": function (val, oldVal) {
      if (! this.isChanging) {
        this.isChanging = true;
        this.control.code(val);
        this.isChanging = false;
        //console.debug("html-editor.model.watch: set control.code = " + val);
      }
    }
  }
};
</script>