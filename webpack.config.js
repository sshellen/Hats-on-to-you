const path = require('path');

module.exports = {
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: "/hats/build/",
    chunkFilename: "chunk-[name].[contenthash].js",
  },
  devServer: {
      historyApiFallback: true,
      port: 3000,
      open: true,
      proxy: {
          "/api": "http://localhost:8080"
      }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },
      {
      loader: 'babel-loader',
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/,
      test: /\.js$/
    }
    ]
  },
  resolve: {
    modules: [
      './node_modules',
      './src'
    ]
  }
};
