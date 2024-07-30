const webpack = require("webpack");

module.exports = {
  // ... other configurations ...
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
