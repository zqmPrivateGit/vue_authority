<template>
    <div class="flowDesign">
        <div class="flowDesign-flex">
            <div class="flowDesign-flex_left">
                <ul class="list-group">
                    <li class="list-group-node" v-for="(item, index) in renderNodes()" :key="index" :style="{ width: item.size[0] + 'px', height: item.size[1] + 'px' }"
                    @dragstart="dragstart"
                    @drag="drag"  
                    draggable="true">
                        {{ item.label }}
                    </li>
                </ul>
            </div>
            <div class="flowDesign-flex_middle">
                <div id="relation-box">
                </div>
            </div>
            <div class="flowDesign-flex_right"></div>
        </div>
    </div>
</template>
<script>
import FlowDesign from './FlowDesign'
export default FlowDesign;
</script>
<style src="./FlowDesign.css" scoped></style>