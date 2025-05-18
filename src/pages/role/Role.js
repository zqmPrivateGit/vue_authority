import { request } from "@/utils/request";
import { ElMessage } from "element-plus";
export default {
  name: "Role",
  data: function () {
    return {
      tableColumn: [
        {
          label: "角色",
          prop: "roleName",
        },
      ],
      // form表单
      form: {
        roleName: ''
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogTitle: "",
      updateId: "",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    this.getRole();
    this.getRouter();
    setTimeout(()=>{
      let roleId = this.getRoleList.length ? this.getRoleList[0].roleId : null;
      this.getBindRouters({ roleId });
    },500)
  },
  computed: {
    // 角色数据
    getRoleList () {
      return this.$store.getters.getRole
    },
    // 路由数据
    getRouterList () {
      return this.$store.getters.getRouter
    }
  },
  methods: {
    // 角色数据列表获取
    getRole() {
      this.$store.dispatch('asyncGetRole');
    },
    // 路由数据列表获取
    getRouter() {
      this.$store.dispatch('asyncGetRouter');
    },
    // 删除选中的数据
    async deleteInfo(deleteId) {
      let data = { roleId: deleteId };
      let res = await request("POST", "/rest/role/delete", data);
      if (res.code == 0) {
        this.$refs.tree.setCheckedKeys([]);
        ElMessage({
          type: 'success',
          message: res.msg
        });
        this.getRole();
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
      if (this.dialogTitle == "添加角色") {
        let data = {
          roleName: this.form.roleName
        };
        let res = await request("POST", "/rest/role/add", data);
        if(res.code == 0) {
          this.dialogVisible = false;
          this.dialogTitle = "";
          ElMessage({
            type: 'success',
            message: res.msg
          });
          this.getRole();
        }
      } else {
        let data = {
          roleId: this.updateId,
          roleName: this.form.roleName
        };
        let res = await request("POST", "/rest/role/update", data);
        if(res.code == 0) {
          this.dialogVisible = false;
          this.dialogTitle = "";
          ElMessage({
            type: 'success',
            message: res.msg
          });
          this.getRole();
        }
      }
    },

    // 获取绑定的路由信息
    async getBindRouters(row) {
      let { roleId } = row;
      let data = { roleId };
      let res = await request("POST", "/rest/role/getRoleRouters", data);
      this.$refs.tree.setCheckedKeys([])
      if(res.code == 0) {
        let { data: { routerIds } } = res;
        routerIds.map(item => {
          let node = this.$refs.tree.getNode(item);
          if(node.isLeaf){
            this.$refs.tree.setChecked(node, true);
          }
        })
      }
      this.updateId = roleId;
    },

    // 角色和路由信息绑定
    async roleBindRouter(roleId) {
      let parentIds = this.$refs.tree.getHalfCheckedKeys();
      let childIds = this.$refs.tree.getCheckedKeys();
      let routerIds = parentIds.concat(childIds);
      let data = { roleId, routerIds };
      let res = await request("POST", "/rest/role/bindRouter", data);
      if(res.code == 0) {
        ElMessage({
          type: 'success',
          message: res.msg
        });
      }
    },

    tableRowClassName({row}) {
      return row.roleId == this.updateId ? 'select-row' : '';
    },

    // 打开模态框
    openDialog(title, scope) {
      this.updateId = scope?.row.roleId;
      this.dialogVisible = true;
      this.dialogTitle = title;
      this.form.roleName = scope?.row.roleName;
    },
    // 关闭模态框
    closeDialog() {
      this.dialogVisible = false;
      this.dialogTitle = "";
    },
  },
};