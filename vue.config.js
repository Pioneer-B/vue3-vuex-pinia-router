const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: {
    //   "/api": {
    //     target: "https://professional.ciganyuan.com",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    proxy: "https://professional.ciganyuan.com",
  },
});
