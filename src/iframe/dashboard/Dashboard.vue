<template>
    <div class="iframe-container">
        <iframe :src="srcUrl" id="iframeId" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            srcUrl: '/dpp-platform/index.html#/dashboard',
        }
    },
    methods: {
        postIframeMessage() {
            const iframe = document.getElementById('iframeId');
            const params = {
                tenantId: localStorage.getItem("tenantId"),
                accessToken: localStorage.getItem("accessToken")
            };
            iframe.contentWindow.postMessage(params, '*')
        }
    },
    created() {
        this.$nextTick(() => {
            this.postIframeMessage();
        })
    }
}
</script>
<style scoped>
.iframe-container {
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 74px);
}

.iframe-container>iframe {
    border: none;
    width: 100%;
    height: 100%;
}
</style>
