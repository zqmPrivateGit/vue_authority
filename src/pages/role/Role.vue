<template>
  <div class="role">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="table">
          <div class="table-header">
            <p class="p-left">
              <el-button type="default" @click="openDialog('添加角色')"
                >添加角色</el-button
              >
            </p>
          </div>
          <el-table :data="getRoleList" @row-click="getBindRouters" :row-class-name="tableRowClassName">
            <el-table-column
              v-for="(item, index) in tableColumn"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="text" @click="openDialog('编辑', scope)"
                  >编辑</el-button
                >
                <el-divider direction="vertical"></el-divider>
                <el-popconfirm
                  title="这是一段内容确定删除吗?"
                  @confirm="deleteInfo(scope.row.roleId)"
                >
                  <template #reference>
                    <el-button type="text">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="pannel">
          <div class="pannel-header">
            <p class="p-left">
              <el-button type="primary" @click="roleBindRouter(updateId)"
                >绑定菜单</el-button
              >
            </p>
          </div>
          <div class="pannel-tree">
            <el-tree
              ref="tree"
              :data="getRouterList"
              show-checkbox
              default-expand-all
              node-key="routerId"
              :props="defaultProps"
            >
            </el-tree>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="30%">
      <div class="form">
        <el-form ref="roleform" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="角色" prop="roleName">
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm('roleform')"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import Role from "./Role";
export default Role;
</script>
<style src="./Role.css" scoped></style>
<style>
 .el-table .select-row {
    background: #F5F7FA;
  }
</style>
