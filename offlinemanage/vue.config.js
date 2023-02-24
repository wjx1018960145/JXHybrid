const { defineConfig } = require('@vue/cli-service')



module.exports = defineConfig({
  lintOnSave:false,//关闭语法检查
  publicPath: '/offlinemanage/',
  transpileDependencies: true,

  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://172.17.7.132:8095',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
})
