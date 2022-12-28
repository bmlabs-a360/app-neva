const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath :'/neva',
  transpileDependencies: true,
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
/*
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(csv|xlsx|xls|t)$/,
          loader: 'file-loader',
          options: {
            name: `files/[name].[ext]`
          }
        }
      ],
     },
  },
};*/
