import iframeRouter from '../iframe/configRouter';
//菜单
export const menuRouter = {
  path: "/",
  name: "admin",
  component: () => import('./pages/admin/Admin.vue'),
  children: [
    ...iframeRouter,
    {
      path: "/map",
      name: "map",
      icon: "icon-location",
      title: "地图引擎",
      meta: { breamub: '地图引擎' },
      component: () => import('./pages/amap/Amap.vue'),
    },
    {
      path: "/charts",
      name: "charts",
      icon: "icon-odometer",
      title: "图表引用",
      meta: { breamub: '图表引用' },
      component: () => import('./pages/charts/Charts.vue'),
    },
    {
      path: "/video",
      name: "video",
      icon: "icon-camera",
      title: "视频管理",
      meta: { breamub: '视频管理' },
      component: () => import('./pages/video/Video.vue'),
    },
    {
      path: "/wangEditor",
      name: "wangEditor",
      icon: "icon-edit-square",
      title: "文本编辑",
      meta: { breamub: '文本编辑' },
      component: () => import('./pages/wangEditor/WangEditor.vue'),
    },
    {
      path: "/webSocket",
      name: "webSocket",
      icon: "icon-monitor",
      title: "即时通信",
      meta: { breamub: '即时通信' },
      component: () => import('./pages/webSocket/WebSocket.vue'),
    },
    {
      path: "/authority",
      name: "authority",
      icon: "icon-shenqingquanxian",
      title: "权限管理",
      component: { render: () => <router-view /> },
      children: [
        {
          path: "/user",
          name: "user",
          title: "用户管理",
          meta: { breamub: '用户管理' },
          component: () => import('./pages/user/User.vue'),
        },
        {
          path: "/role",
          name: "role",
          title: "角色管理",
          meta: { breamub: '角色管理' },
          component: () => import('./pages/role/Role.vue'),
        },
        {
          path: "/menu",
          name: "menu",
          title: "菜单管理",
          meta: { breamub: '菜单管理' },
          component: () => import('./pages/menu/Menu.vue'),
        },
      ],
    },
    {
      path: "/dragTool",
      name: "dragTool",
      icon: "icon-keshihua",
      title: "拖拽工具",
      component: { render: () => <router-view /> },
      children: [
        {
          path: '/flowDesign',
          name: "flowDesign",
          title: "流程设计",
          meta: { breamub: '流程设计' },
          component: () => import('./pages/flowDesign/FlowDesign.vue'),
        },
        {
          path: '/formDesign',
          name: "formDesign",
          title: "表单设计",
          meta: { breamub: '表单设计' },
          component: () => import('./pages/formDesign/FormDesign.vue'),
        }
      ],
    },
    {
      path: '/businessScene',
      name: 'businessScene',
      icon: 'icon-grid',
      title: '业务场景',
      component: { render: () => <router-view /> },
      children: [
        {
          path: "/market",
          name: "market",
          title: "营销活动",
          meta: { breamub: '营销活动' },
          component: () => import('./pages/market/Market.vue'),
        },
        {
          path: '/openai',
          name: "openai",
          title: "智能对话",
          meta: { breamub: '智能对话' },
          component: () => import('./pages/openai/Openai.vue'),
        }
      ]
    }
  ],
};

// 无权限控制
export const noMangeRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import('./pages/login/Login.vue'),
  },
  {
    path: "/error",
    name: "error",
    component: () => import('./pages/error/Error.vue'),
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: () => import('./pages/weixin/Qrcode.vue')
  }
];

//路由合并
export const routes = [...noMangeRouter, menuRouter];
