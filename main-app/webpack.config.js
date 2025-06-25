const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

// Get environment variables or use defaults
const isProd = process.env.NODE_ENV === 'production';
const musicLibraryUrl = isProd 
  ? process.env.MUSIC_LIBRARY_URL || 'https://music-library-finaacplus-manishindiyaars-projects.vercel.app/remoteEntry.js'
  : 'http://localhost:3003/remoteEntry.js';

console.log('Using music library URL:', musicLibraryUrl);

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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
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
        react: { singleton: true, requiredVersion: '^18.0.0' },
        "react-dom": { singleton: true, requiredVersion: '^18.0.0' },
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

