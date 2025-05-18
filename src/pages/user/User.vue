<template>
  <div class="user">
    <div class="table">
      <div class="table-header">
        <p class="p-left">
          <el-button type="default" @click="openDialog('添加用户')"
            >添加用户</el-button
          >
        </p>
        <p class="p-right">
          <el-input
            placeholder="请输入关键字检索"
            class="search-input"
            v-model="search"
          ></el-input>
          <el-button type="primary" @click="searchHandle">查询</el-button>
        </p>
      </div>
      <el-table :data="changeTableInfo">
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          align="center"
        >
          <template #default="scope" v-if="item.prop == 'active'">
            <el-switch v-model="scope.row.active" @change="isOpenAccount(scope.row)" :disabled="scope.row.userType == 'admin' ? true : false"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="text" @click="openDialog('编辑用户', scope)"
              >编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <!-- 气泡确认框 -->
            <el-popconfirm
              title="这是一段内容确定删除吗?"
              @confirm="deleteInfo(scope.row.userId)"
            >
              <template #reference>
                <el-button type="text" :disabled="scope.row.userType == 'admin' ? true : false">删除</el-button>
              </template>
            </el-popconfirm>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              title="是否确定进行密码重置?"
              @confirm="resetPassword(scope.row.userId)"
            >
              <template #reference>
                <el-button type="text">重置密码</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="30%">
      <div class="form">
        <el-form ref="userform" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              style="width: 100%"
              type="date"
              placeholder="选择日期"
              v-model="form.createTime"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码"  prop="password" v-if="dialogTitle == '添加用户'">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="角色类型:" v-if="userType != 'admin'">
            <el-checkbox-group v-model="form.checkedList" @change="handleCheckAllChange">
              <el-checkbox v-for="(item, index) in getRoleList" :key="index" :label="item.roleId">{{ item.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm('userform')">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import User from "./User";
export default User;
</script>
<style src="./User.css" scoped></style>
