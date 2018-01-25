const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin("[name].css");

module.exports = [
{
  /* ----------------
     JS用モジュール
    ----------------- */
  entry: {
    main: "./src/js/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    publicPath: '/js/',
    filename: "[name].js"
  },
  plugins: [
    /* use jQuery as Global */
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
    })
  ],
  resolve: {
    extensions: ['.js']
  }
},
{
  /* ----------------
     CSS用モジュール
    ----------------- */
  entry: {
    main: "./src/scss/app.scss"
  },
  output: {
    path: path.resolve(__dirname, "dist/css"),
    publicPath: '/css/',
    filename: "[name].css"
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    extractSass,
  ],
  resolve: {
    // style-loader の中で、.jsファイルを拡張子なしで requireしているところがあるため、'.js'が必要
    extensions: ['.css', '.js']
  },
}
];
