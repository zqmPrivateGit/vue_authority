import { request } from "@/utils/request";
import { menuRouter } from "../../routes";
export default {
  name: "Admin",
  data: function() {
    return {
      menuList: [],
      collapse: false,
      collapseIcon: "icon-cc-arrow-left-square",
      routeActive: "",
      parentOpenActive: "",
      isTitle: true,
      currentBreamub: "",
      drawer: false,
      direction: "rtl",
      activeIndex: "2"
    };
  },
  created() {
    this.routerAdmin();
  },
  watch: {
    $route: {
      handler(next) {
        this.currentBreamub = next.meta.breamub;
      },
      deep: true,
    },
  },
  methods: {
    // 获取用户绑定的路由信息
    async getUserBindRouters() {
      let userId = localStorage.getItem("loginId");
      let userType = localStorage.getItem("userType");
      let res = await request("POST", "/rest/router/getRouters", {
        userId,
        userType,
      });
      if (res.code == 0) {
        if (
          res.data.some((item) => item.name == this.$route.name) ||
          this.$route.path == "/"
        ) {
          this.menuList = this.authorityMenu(menuRouter.children, res.data);
          this.$route.matched.forEach((item, index) => {
            this.parentOpenActive =
              this.$route.path == item.path && index != 0
                ? this.$route.matched[index - 1].path
                : null;
          });
          if (this.$route.path === "/" && res.data.length) {
            let length = res.data.length;
            let url =
              length > 1
                ? res.data[1].parentId != 0
                  ? res.data[1].path
                  : res.data[0].path
                : res.data[0].path;
            this.$router.push(url);
            this.routeActive = url;
          } else {
            this.routeActive = this.$route.path;
            this.currentBreamub = this.$route.meta.breamub;
          }
        } else {
          this.$router.push("/error");
        }
      }
    },
    collapseToggle() {
      this.collapse = !this.collapse;
      this.collapseIcon = this.collapse
        ? "icon-cc-arrow-right-square"
        : "icon-cc-arrow-left-square";
      setTimeout(() => {
        this.isTitle = !this.isTitle;
      }, 100);
    },
    routerAdmin() {
      if (!sessionStorage.getItem("token")) {
        this.$router.push("/login");
      } else {
        this.getUserBindRouters();
      }
    },
    authorityMenu(menuArray, routerList) {
      const filterLevelInfo = (route, routeCodeList) => {
        let array = [];
        route.map((item) => {
          if (
            routeCodeList.some(
              (element) => element.name == item.name || !item.name
            )
          ) {
            if (item.children) {
              item.routes = filterLevelInfo(item.children, routeCodeList);
            }
            array.push(item);
          }
        });
        return array;
      };
      let filterRoutes = filterLevelInfo(menuArray, routerList);
      return filterRoutes;
    },
    routerLogin() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
