module.exports = {
  entry: "./lib/main.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js" ]
  }
};
