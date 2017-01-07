import fs from 'fs';
import glob from 'glob';

fs.writeFileSync('mappedComponents.gen.js', `
  const components = {};
  ${getImportsForComponents()}
  export default components;
`);

function getImportsForComponents() {
  return glob.sync('./server/test/fixtures/*.js').reduce((str, path) => {
    const name = getFilename(path);
    str = str + `import ${name} from '${path}';\n`;
    str = str + `components['${name}'] = ${name};\n`;
    return str;
  }, '');
}

function getFilename(path) {
  return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
}

module.exports = [{
  name: 'web',
  entry: './web/src/app.js',
  output: {
    path: 'dist',
    filename: 'web.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
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
}, {
  name: 'mapped-components',
  entry: './web/src/mappedComponents.js',
  output: {
    path: 'dist',
    filename: 'mappedComponents.bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
}];

