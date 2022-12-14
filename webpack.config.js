const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

console.log('NODE_ENV: ', process.env.NODE_ENV)

module.exports = {
  entry: path.resolve(__dirname, './storedemo/client/index.js'),

  output: {
    path: path.resolve(__dirname, './storedemo/build/'),
    filename: 'bundle.js',
    publicPath: '/build',
  },

  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './storedemo/public/index.html')
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './storedemo/public/'),
    },
    // server: {
    //   type: 'https',
    //   options: {
    //     key: fs.readFileSync(path.resolve(__dirname, './server/keys/server.key')),
    //     cert: fs.readFileSync(path.resolve(__dirname, './server/keys/server.crt'))
    //   }
    // },
    compress: false,
    port: 8082,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/inventory/': {
        target: 'http://localhost:3000/',
        secure: false,
      }, 
      // '/event/**': {
      //   target: 'https://localhost:3000/',
      //   secure: true,
      //   ws: true,
      // }, 
      '/websocket': {
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
