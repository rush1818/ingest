module.exports = {
  entry: "./lib/main.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js" ]
  }
};
