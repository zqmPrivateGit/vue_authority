<template>
  <div class="admin">
    <el-container>
      <el-aside width="auto">
        <div class="aside_header">
          <p class="aside_content">
            <span class="aside_title" v-if="isTitle">配置管理平台</span>
            <span class="iconfont icon-setting-fill" v-if="!isTitle"></span>
          </p>
        </div>
        <el-menu mode="vertical" class="el-menu-vertical-demo" :collapse="collapse"
          :default-openeds="[parentOpenActive]" :default-active="routeActive">
          <template v-for="(item, index) in menuList" :key="index">
            <template v-if="item.routes">
              <el-sub-menu :index="item.path">
                <template #title>
                  <i :class="`iconfont ${item.icon} iconInterval`"></i>
                  <span>{{ item.title }}</span>
                </template>
                <router-link v-for="(subItem, subIndex) in item.routes" :to="subItem.path" :key="subIndex">
                  <el-menu-item :index="subItem.path">
                    <template #title><span>{{ subItem.title }}</span></template>
                  </el-menu-item>
                </router-link>
              </el-sub-menu>
            </template>
            <template v-else>
              <router-link :to="item.path">
                <el-menu-item :index="item.path">
                  <i :class="`iconfont ${item.icon} iconInterval`"></i>
                  <template #title><span>{{ item.title }}</span></template>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <i :class="`iconfont ${collapseIcon} iconInterval`" @click="collapseToggle"></i>
            <el-tooltip class="item" effect="light" content="刷新" placement="bottom">
              <i class="iconfont icon-shuaxin iconInterval"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="全屏" placement="bottom">
              <i class="iconfont icon-quanping iconInterval"></i>
            </el-tooltip>
          </div>
          <div>
            <el-tooltip class="item" effect="light" content="消息通知" placement="bottom">
              <i class="iconfont icon-xiaoxitongzhi iconInterval" @click="drawer = true"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="注销" placement="bottom">
              <i class="iconfont icon-user" @click="routerLogin"></i>
            </el-tooltip>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb>
            <el-breadcrumb-item>配置管理平台</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentBreamub }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-drawer v-model="drawer" title="通知栏" :direction="direction">
        <el-empty description="暂无消息" />
      </el-drawer>
    </el-container>
  </div>
</template>
<script>
import Admin from "./Admin"
export default Admin
</script>
<style src="./Admin.css" scoped>

</style>
