const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        /* Resources */
        { from: 'src/assets', to: 'assets', globOptions: { ignore: ['**/.DS_Store'] } },
        /* Web */
        { from: '**/*.html', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: '**/*.css', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
        /* Root Path: favicon.ico, site.webmanifest, etc. */
        { from: '*.png', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: '*.xml', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: '*.svg', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: 'favicon.ico', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
        { from: 'site.webmanifest', to: './[path][name][ext]', context: 'src', globOptions: { ignore: ['**/.DS_Store'] } },
      ],
    }),
  ],
};