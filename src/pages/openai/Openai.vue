<template>
    <div class="openai">
        <!-- 输入问题 -->
        <div class="openai-issue">
            <textarea
                v-model="issue"
                placeholder="请输入问题"
            />
        </div>
        <!-- 提交问题 -->
        <div class="openai-submit">
            <el-button type="primary" @click="openAiComplet(issue)">提交</el-button>
        </div>
        <!-- 回答问题 -->
        <div class="openai-answer">
            {{ answer }}
        </div>
    </div>
</template>
<script>
import Openai from './Openai';
export default Openai;
</script>
<style src="./Openai.css" ></style>