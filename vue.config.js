const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    proxy: {
      api: {
        target: "http://localhost:7001",
        ws: true,
        changeOrigin: true,
      },
      public: {
        target: "http://localhost:7001",
        ws: true,
        changeOrigin: true,
      },
    }, // 设置代理
    // before: app => {}
  },
})
