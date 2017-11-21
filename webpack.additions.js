/* webpack.renderer.additions.js */

module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-airbnb', 'babel-preset-react'],
          },
        },
      },
    ],
  },
};
