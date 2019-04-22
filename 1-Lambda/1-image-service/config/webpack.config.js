const path = require('path')

// main directory is the current one's parent
const dir = path.join(__dirname, '/..')

const plugins = []

// TODO: dynamically enumerate service entry points

module.exports = {
  entry: {
    '1-version-service': './src/1-version-service.js',
    '2-image-service': './src/2-image-service.js'
  },
  target: 'node',
  externals: {
    // Available within AWS Lambda environment
    'aws-sdk': 'commonjs aws-sdk'
  },
  plugins,
  optimization: {
    // To disable Uglify, set minimizer to an empty array
    // You can also create a new UglifyJsPlugin object as the first element
    // if you want to use custom uglify options
    minimizer: []
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(dir, '.webpack'),
    filename: 'src/[name].js'
  },
  mode: 'production'
}
