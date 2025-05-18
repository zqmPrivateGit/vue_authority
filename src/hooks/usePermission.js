export default {
  install(app) {
    // 自定义按钮级别权限控制指令
    app.directive("permission", {
      mounted(el, binding) {
        let permissionList = [];
        el.style.display = "none";
        if (permissionList.some((v) => v == binding.value)) {
          el.style.display = "block";
        }
      },
    });
  },
};
