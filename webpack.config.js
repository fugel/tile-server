const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client/app.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "ts-loader", options: { configFile: "wp.tsconfig.json" } },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist/client"),
  },
};
