import axios from 'axios';

const http = axios.create();

http.defaults.withCredentials = false;

// 请求拦截器
http.interceptors.request.use(config => {
    config.headers[`tenant-id`] = 1;
    let token = sessionStorage.getItem('token');
    // const accessToken = localStorage.getItem("accessToken");
    // const tentId = localStorage.getItem("tenantId");
    // if (tentId) config.headers[`tenant-id`] = `${tentId}`;
    if (token) {
        config.headers.authorization = token; // 将token放到请求头发送给服务器
        // config.headers[`Authorization`] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use((response) => {
    if (response.data.code == 401) {
        sessionStorage.removeItem('token');
    } else {
        return response;
    }
}, (error) => {
    return Promise.reject(error)
});

/**
 * @param {String} method                 // 请求的类型 
 * @param {String} url                    // 请求地址
 * @param {Object} data | @default {}     // 接受的参数
 */

export const request = (method, url, data, baseURL = '/api') => {
    return new Promise((resolve) => {
        let option = {
            method,
            url,
            data,
            baseURL,
            responseType: 'json'
        };
        http(option).then(res => {
            resolve(res.data);
        }).catch((err) => {
            console.log('error', err);
        })
    })
}