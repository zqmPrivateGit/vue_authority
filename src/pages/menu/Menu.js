import { request } from "@/utils/request";
import { ElMessage } from "element-plus";
import SelectTree from "@/components/selectTree/SelectTree.vue";
export default {
  components: {
    SelectTree,
  },
  name: "Menu",
  data: function() {
    return {
      formType: 1,
      disabledVal: "",
      defaultProps: {
        value: "routerId",
        label: "title",
        children: "children",
      },
      tableColumn: [
        {
          label: "标题",
          prop: "title",
        },
        {
          label: "地址",
          prop: "path",
        },
        {
          label: "名称",
          prop: "name",
        },
      ],
      // form表单
      form: {
        title: "",
        path: "",
        name: "",
        routerId: "",
      },
      // resourceForm表单
      resourceForm: {
        name: "",
        type: "",
        routerId: "",
      },
      // 表单校验
      rules: {
        title: [{ required: true, message: "请输入路由标题", trigger: "blur" }],
        path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        name: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
        parentId: [
          { required: true, message: "请选择路由层级", trigger: "blur" },
        ],
      },
      // resourceForm表单校验
      resourceRules: {
        name: [{ required: true, message: "请输入资源标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
      },
      search: "",
      dialogVisible: false,
      dialogTitle: "",
      updateId: "",
    };
  },
  created() {
    this.getRouter();
  },
  computed: {
    // 路由数据
    getRouterList() {
      return this.$store.getters.getRouter;
    },
  },
  methods: {
    // 路由数据列表获取
    getRouter() {
      this.$store.dispatch("asyncGetRouter");
    },
    // 删除选中的数据
    async deleteInfo(deleteId) {
      let data = { routerId: deleteId };
      let res = await request("POST", "/rest/router/delete", data);
      if (res.code == 0) {
        ElMessage({
          type: "success",
          message: res.msg,
        });
        this.getRouter();
      }
    },
    // 表单提交
    submitForm() {
      let form = this.formType == 1 ? "menuform" : "resourceForm";
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.changeInfo(this.formType);
        } else {
          return false;
        }
      });
    },
    // 编辑数据
    async changeInfo(formType) {
      // 操作菜单数据
      if (formType == 1) {
        if (this.dialogTitle == "添加路由") {
          let data = {
            title: this.form.title,
            name: this.form.name,
            path: this.form.path,
            parentId: this.form.routerId,
          };
          let res = await request("POST", "/rest/router/add", data);
          if (res.code == 0) {
            this.dialogVisible = false;
            this.dialogTitle = "";
            ElMessage({
              message: res.msg,
              type: "success",
            });
            this.getRouter();
          }
        } else {
          let data = {
            routerId: this.updateId,
            title: this.form.title,
            name: this.form.name,
            path: this.form.path,
            parentId: this.form.routerId,
          };
          let res = await request("POST", "/rest/router/update", data);
          if (res.code == 0) {
            this.dialogVisible = false;
            this.dialogTitle = "";
            ElMessage({
              type: "success",
              message: res.msg,
            });
            this.getRouter();
          }
        }
      // 操作资源
      } else {
        console.log("添加资源信息");
      }
    },
    // 数据检索
    searchHandle() {},
    getValue(value) {
      this.form.routerId = value;
    },
    clearValue() {
      this.form.routerId = 0;
    },
    // 打开模态框
    openDialog(title, scope) {
      this.updateId = scope?.row.routerId;
      this.dialogVisible = true;
      this.dialogTitle = title;
      this.form.title = scope?.row.title;
      this.form.name = scope?.row.name;
      this.form.path = scope?.row.path;
      this.form.routerId = scope ? scope.row.parentId : 0;
      if (title == "编辑") this.formType = 1;
    },
    // 关闭模态框
    closeDialog() {
      this.dialogVisible = false;
      this.dialogTitle = "";
    },
  },
};
