const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

// Get environment variables or use defaults
const isProd = process.env.NODE_ENV === 'production';
const publicPath = isProd 
  ? process.env.PUBLIC_PATH || 'auto'
  : 'auto';

module.exports = {
  entry: './src/index',
  mode: isProd ? 'production' : 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3003,
  },
  output: {
    publicPath: publicPath,
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    clean: isProd,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'music_library',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: { 
        react: { singleton: true, requiredVersion: '^18.0.0' }, 
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' } 
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      templateParameters: {
        title: 'Music Library',
      },
    }),
  ],
  optimization: isProd ? {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  } : undefined,
};
