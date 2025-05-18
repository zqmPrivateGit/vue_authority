<template>
  <div class="menu">
    <div class="table">
      <div class="table-header">
        <p class="p-left">
          <el-button type="default" @click="openDialog('添加路由')">添加路由</el-button>
        </p>
        <p class="p-right">
          <el-input placeholder="请输入关键字检索" class="search-input" v-model="search"></el-input>
          <el-button type="primary" @click="searchHandle">查询</el-button>
        </p>
      </div>
      <el-table :data="getRouterList" row-key="routerId" :tree-props="{ children: 'children' }">
        <el-table-column v-for="(item, index) in tableColumn" :key="index" :label="item.label" :prop="item.prop"
          align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="text" @click="openDialog('编辑', scope)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <!-- 气泡确认框 -->
            <el-popconfirm title="这是一段内容确定删除吗?" @confirm="deleteInfo(scope.row.routerId)">
              <template #reference>
                <el-button type="text" :disabled="scope.row.children ? true : false">删除</el-button>
              </template>
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" :disabled="scope.row.children ? true : false">资源分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="30%" :destroy-on-close="true">
      <div class="form">
        <div class="form-type" v-if="dialogTitle == '添加路由'">
          <el-radio-group v-model="formType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">资源</el-radio>
          </el-radio-group>
        </div>
        <!-- 菜单 -->
        <el-form ref="menuform" :rules="rules" :model="form" label-width="80px" v-if="formType == 1">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入路由标题"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="path">
            <el-input v-model="form.path" placeholder="请输入路由地址"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入路由名称"></el-input>
          </el-form-item>
          <el-form-item label="层级" prop="routerId">
            <select-tree :props="defaultProps" :options="getRouterList" :value="form.routerId" :onlyKey="updateId"
              placeholder="请选择层级" @getValue="getValue($event)" @clear="clearValue"></select-tree>
          </el-form-item>
        </el-form>
        <!-- 资源 -->
        <el-form ref="resourceForm" :rules="resourceRules" :model="resourceForm" label-width="80px" v-if="formType == 2">
           <el-form-item label="资源标题" prop="name">
             <el-input v-model="resourceForm.name" placeholder="请输入资源标题"></el-input>
           </el-form-item>
           <el-form-item label="资源名称" prop="type">
             <el-input v-model="resourceForm.type" placeholder="请输入资源名称"></el-input>
           </el-form-item>
           <el-form-item label="绑定层级" prop="routerId">
            <select-tree :props="defaultProps" :options="getRouterList" :value="resourceForm.routerId" :onlyKey="updateId"
              placeholder="请选择层级" @getValue="getValue($event)" @clear="clearValue"></select-tree>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import Menu from "./Menu";
export default Menu;
</script>
<style src="./Menu.css" scoped></style>
