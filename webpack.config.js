module.exports = [{
  name: 'web',
  entry: './web/src/app.js',
  output: {
    path: 'dist',
    filename: 'web.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
},{
  name: 'server',
  entry: './server/src/server.js',
  target: 'node',
  output: {
    path: 'dist',
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
}];
