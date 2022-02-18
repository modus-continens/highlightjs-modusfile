module.exports = {
  entry: "./index.js",
  output: {
    path: require("path").resolve(__dirname, "dist"),
    filename: "index.js"
  },
  mode: "production"
};
