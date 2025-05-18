import { request } from "@/utils/request";
import * as tools from "@/utils/function";
import { ElMessage } from "element-plus";
export default {
  name: "User",
  data: function () {
    return {
      tableColumn: [
        {
          label: "创建日期",
          prop: "createTime",
        },
        {
          label: "用户",
          prop: "name",
        },
        {
          label: "账号",
          prop: "account",
        },
        {
          label: "是否启用",
          prop: "active",
          render: () => <el-switch />,
        },
      ],
      //form表单
      form: {
        createTime: "",
        name: "",
        account: "",
        password: "",
        checkedList: []
      },
      // 表单校验
      rules: {
        createTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      tableData: [],
      changeTableInfo: [],
      search: "",
      dialogVisible: false,
      dialogTitle: "",
      updateId: "",
      userType: "",
      active: 0,
    };
  },
  created() {
    this.getInfo();
  },
  computed: {
    getRoleList () {
      return this.$store.getters.getRole
    }
  },
  methods: {
    // 角色数据列表获取
    getRole() {
      this.$store.dispatch('asyncGetRole');
    },
    // 账号是否启用
    async isOpenAccount(row) {
      const { active, userId } = row;
      let data = {
        active: active ? 1: 0,
        userId
      };
      let res = await request("POST", "/rest/user/isActive", data);
      if(res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.msg
        });
        this.getInfo();
      }
    },
    // 数据列表查询
    async getInfo() {
      let res = await request("GET", "/rest/user/query");
      if (res.code == 0) {
        this.tableData = res.data.map((item) => {
          item.createTime = tools.getNowFormatTime(item.createTime);
          item.switch = item.active ? true : false;
          return item;
        });
        this.changeTableInfo = this.tableData;
      }
    },
    // 删除选中的数据
    async deleteInfo(deleteId) {
      let data = { userId: deleteId };
      let res = await request("POST", "/rest/user/delete", data);
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.msg
        });
        this.getInfo();
      }
    },
    // 重置密码
    async resetPassword(userId) {
      let data = { userId };
      let res = await request("POST", "/rest/user/resetPassword", data);
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.msg
        });
        this.getInfo();
      }
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeInfo();
        } else {
          return false;
        }
      })
      },
    // 编辑数据
    async changeInfo() {
      if (this.dialogTitle == "添加用户") {
        let data = {
          createTime: tools.getNowFormatTime(this.form.createTime),
          name: this.form.name,
          account: this.form.account,
          password: this.form.password,
          active: 0,
          roleIds: this.form.checkedList
        };
        let res = await request("POST", "/rest/user/add", data);
        if (res.code == 0) {
          this.dialogVisible = false;
          this.dialogTitle = "";
          ElMessage({
            type: 'success',
            message: res.msg
          });
          this.getInfo();
        }
      } else {
        let data = {
          userId: this.updateId,
          createTime: tools.getNowFormatTime(this.form.createTime),
          name: this.form.name,
          account: this.form.account,
          password: this.form.password,
          active: this.active,
          roleIds: this.form.checkedList
        };
        let res = await request("POST", "/rest/user/update", data);
        if (res.code == 0) {
          this.dialogVisible = false;
          this.dialogTitle = "";
          ElMessage({
            type: 'success',
            message: res.msg
          });
          this.getInfo();
        }
      }
    },
    // 数据检索
    searchHandle() {
      this.changeTableInfo = this.tableData.filter((item) => {
        item.createTime = tools.getNowFormatTime(item.createTime);
        return Object.values(item).some((ele) =>
          String(ele).toLocaleLowerCase().includes(this.search)
        );
      });
    },
    // 打开模态框
    openDialog(title, scope) {
      this.dialogVisible = true;
      this.dialogTitle = title;
      this.active = scope ? Number(scope.row.active) : "",
      this.userType = scope ? scope.row.userType : "",
      this.form.name = scope ? scope.row.name : "";
      this.updateId = scope ? scope.row.userId : "";
      this.form.account = scope ? scope.row.account : "";
      this.form.password = scope ? scope.row.password : "";
      this.form.checkedList = scope ? scope.row.roleIds : [];
      this.form.createTime = scope ? scope.row.createTime : undefined;
      this.getRole();
    },
    // 关闭模态框
    closeDialog() {
      this.dialogVisible = false;
      this.dialogTitle = "";
    },
    // 复选框选择
    handleCheckAllChange(value) {
        this.form.checkedList = value;
    }
  },
};