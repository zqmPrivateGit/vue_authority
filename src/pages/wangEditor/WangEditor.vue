<template>
  <div class="wangEditor">
    <div class="toolbar">
      <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
    </div>
    <p class="glp"></p>
    <div class="mainContainer">
      <div class="contentUl">
      </div>
      <div class="text">
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
        <div class="text-action">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WangEditor from "./WangEditor";
export default WangEditor;
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style src="./WangEditor.css" scoped></style>