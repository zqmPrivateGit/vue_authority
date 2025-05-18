import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: "WangEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
        this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
},
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
      }, 1500)
    });
  },
};
