const path = require("path");
const slsw = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const folderName = "./.webpack/";

module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      canvas: false,
    },
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, `${folderName}`),
    filename: "[name].js",
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
        parallel: true,
      }),
    ],
  },
  externals: [
    {
      "aws-sdk": "commonjs aws-sdk",
      "utf-8-validate": "commonjs utf-8-validate",
      "chrome-aws-lambda": "commonjs chrome-aws-lambda",
      handlebars: "commonjs handlebars",
      "puppeteer-core": "commonjs puppeteer-core",
    },
  ],
  target: "node",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                module: "es6",
                target: "es2017",
              },
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};
