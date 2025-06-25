const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

// Get environment variables or use defaults
const isProd = process.env.NODE_ENV === 'production';
const musicLibraryUrl = isProd 
  ? process.env.MUSIC_LIBRARY_URL || 'https://music-library.yourdomain.com/remoteEntry.js'
  : 'http://localhost:3003/remoteEntry.js';

module.exports = {
  entry: "./src/index",
  mode: isProd ? "production" : "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
    filename: '[name].[contenthash].js',
    clean: isProd,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mainApp",
      remotes: {
        musicLibrary: `music_library@${musicLibraryUrl}`,
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  optimization: isProd ? {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  } : undefined,
};

