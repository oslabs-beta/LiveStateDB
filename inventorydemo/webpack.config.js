const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('NODE_ENV: ', process.env.NODE_ENV)

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),

  output: {
    path: path.resolve(__dirname, './build/'),
    filename: 'bundle.js',
    publicPath: '/build',
  },

  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './public/index.html')
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public/'),
    },
    compress: false,
    port: 8080,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/inventory/**': {
        target: 'http://localhost:3000/',
        secure: false,
      }, 
      '/event/**': {
        target: 'http://localhost:3000/',
        secure: false,
        ws: true,
      }, 
    },
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          // Compiles Sass to CSS
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js','.jsx','.json'] 
  }
};
