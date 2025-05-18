// 全局状态管理
import { createStore } from 'vuex';

// 接口请求
import { request } from "@/utils/request";

const store = createStore({
    state: {
        // 角色数据
        roleList: [],
        // 路由数据
        routerList: []
    },
    mutations: {
        // 角色数据更改
       syncGetRole (state, arr) {
             state.roleList = arr;
       },
       // 路由数据更改
       syncGetRouter (state, arr) {
             state.routerList = arr;
       }
    },
    actions: {
        // 获取角色数据
       asyncGetRole ({ commit }) {
         (async () => {
             let res = await request("GET", "/rest/role/query");
             if(res.code == 0) {
                commit('syncGetRole', res.data);
             }
         })()
       },
       // 获取路由数据
       asyncGetRouter ({ commit }) {
          (async () => {
              let res = await request("GET", "/rest/router/query");
              if(res.code == 0) {
                  commit('syncGetRouter', res.data);
              }
          })()
       }
    },
    getters: {
        getRole: state => {
            return state.roleList
        },
        getRouter: state => {
            return state.routerList
        }
    }
})

export default store;