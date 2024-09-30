const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // ... other config
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'shared', 'assets', 'img'),
          to: path.resolve(__dirname, 'dist', 'images')
        },
      ],
    }),
  ],
  // ... rest of config
};

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/server/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
  },
  externals: {
    // Exclude puppeteer-core and chrome-aws-lambda from the Webpack bundle
    'chrome-aws-lambda': 'commonjs chrome-aws-lambda',
    'puppeteer-core': 'commonjs puppeteer-core',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/images/',
              emitFile: false, // Don't emit files for server build
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: 'null-loader'
      },
    ],
  },
  // externals: [nodeExternals()], // Ignore node_modules for server-side
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'shared', 'assets', 'img'),
          to: path.resolve(__dirname, 'dist', 'images')
        },
      ],
    }),
  ],
};