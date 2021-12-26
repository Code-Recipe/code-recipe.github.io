const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/js/app.js",
  },
  output: {
    path: path.resolve(__dirname, "docs"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      sass: path.resolve(__dirname, 'src/sass')
    },
    extensions: ["*", ".js", ".vue", ".json"],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/sass'),
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true,
    port: 9000,
  },
};