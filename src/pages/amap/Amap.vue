<template>
  <div class="amap">
    <div id="container">
      <div class="keywordClass">
        <el-input
          placeholder="关键字检索"
          id="keywordInput"
          v-model="keywordInput"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="keywordSearch"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
      <div id="panel" class="panelClass"></div>
    </div>
    <!-- 路线规划 -->
    <div class="routePlan">
      <!-- 搜索栏 -->
      <div class="routeSearchClass">
        <div class="locationSearch">
          <el-input placeholder="起始位置" v-model="locationSearchStart" />
          <el-input placeholder="结束位置" v-model="locationSearchEnd" />
          <el-button type="primary" @click="routeSearch">搜索</el-button>
        </div>
        <div class="covertSearchType">
          <ul>
            <li>
              <div>
                <span>驾车</span>
              </div>
              <div>
                <el-radio label="drivingComponent" v-model="radioChecked" @change="checkBindVal"><span /></el-radio>
              </div>
            </li>
            <li>
              <div>
                <span>步行</span>
              </div>
              <div>
                <el-radio label="walkingComponent" v-model="radioChecked" @change="checkBindVal"><span /></el-radio>
              </div>
            </li>
            <li>
              <div>
                <span>骑行</span>
              </div>
              <div>
                <el-radio label="RidingComponent" v-model="radioChecked" @change="checkBindVal"><span /></el-radio>
              </div>
            </li>
            <li>
              <div>
                <span>公交</span>
              </div>
              <div>
                <el-radio label="TransferComponent" v-model="radioChecked" @change="checkBindVal"><span /></el-radio>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 路线详情 -->
      <div id="routePanel" class="routePanelClass"></div>
    </div>
  </div>
</template>
<script>
import Amap from "./Amap";
export default Amap;
</script>
<style src="./Amap.css"></style>
