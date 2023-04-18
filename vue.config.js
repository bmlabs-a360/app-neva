const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath : process.env.NODE_ENV === 'production' ?  '/' : '/neva',
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(csv|xlsx|xls|txt)$/,
          loader: "file-loader",
          options: {
            name: `files/[name].[ext]`,
          },
        },
        {
          test: /\.(js)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
  },
});
