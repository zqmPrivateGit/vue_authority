const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    devServer: {
        host: '192.168.111.9',
        port:8011,
        open:true,
        proxy: {
            '/echarts': {
                target: 'https://echarts.apache.org/examples',
                changeOrigin: true,
                pathRewrite:{'^/echarts':''},
            },
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {'^/api':''}
            },
            '/magicApi': {
                target: 'http://demo.mf999.com',
                changeOrigin: true,
                pathRewrite: { '^/magicApi': '' }
            },
            '/admin-api': {
                target: 'http://192.168.110.221:48080/admin-api',
                changeOrigin: true,
                pathRewrite: { '^/admin-api': '' }
            } 
        }
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
              }),
              Components({
                resolvers: [ElementPlusResolver()],
              }),
              require('unplugin-element-plus/webpack') ({

              })
        ],
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                },
            ]
        }
    }
}