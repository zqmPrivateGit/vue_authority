import { createApp } from 'vue';
import store from './store.js';
import App from './App.vue'
//导出router实例
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

// 
import * as fundebug from "fundebug-javascript";
import FundebugVue from "fundebug-vue";

// 导入自定义指令
import usePermission from '@/hooks/usePermission';

const app = createApp(App);

fundebug.apikey = "42a20705e4545857870565c0d907e74fd6a10258b6498420d2e7d92c6dab00ed";


//创建router实例
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

app.use(ElementPlus, { locale })

//配置路由
app.use(router);

// 配置全局状态管理
app.use(store);

// 按钮权限控制
app.use(usePermission);

// debug
app.use(new FundebugVue(fundebug))

app.mount('#app');



