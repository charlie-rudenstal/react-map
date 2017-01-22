import fs from 'mz/fs';
import { regMatch, memoize } from './utils';
const readFileCached = memoize(fs.readFile);
const basePath = "server/test/fixtures";

function getComponents() {
  return fs.readdir(basePath).then(listing => {
    return listing
     .filter(filename => {
      const ext = filename.substr(filename.lastIndexOf('.'));
      return ext === '.js';
     })
     .map(filename => {
      const name = filename.slice(0, filename.lastIndexOf('.'));
      return {
        name,
        path: `${filename}`
      };
    })
  });
}

function getChildren(filepath) {
  return readFileCached(`${basePath}/${filepath}`, 'utf-8').then(content => {
    const tags = content.match(/<([^/][^>]+)>/g);
    const tagNames = tags.map(tag => tag.slice(1, tag.indexOf(' ')));
    const uniqueTagNames = [...new Set(tagNames)];
    return uniqueTagNames.map(name => {
      return { name };
    });
  });
}

function getClassNames(filepath) {
  return readFileCached(`${basePath}/${filepath}`, 'utf-8').then(content => {
    const classValues = regMatch(/className="([^"]+)/g, content);
    const classNames = classValues.reduce((names, curValue) => {
      return names.concat(curValue.split(' '));
    }, []);
    const uniqueClassNames = [...new Set(classNames)];
    return uniqueClassNames.map(name => {
      return { name };
    })
  });
}

function getDependencies(filepath) {
  return readFileCached(`${basePath}/${filepath}`, 'utf-8').then(content => {
    const dependencies = regMatch(/import ([^\s]+) from '([^']+)';/g, content, true);
    return dependencies.map(dependency => {
      return {
        name: dependency[1],
        path: dependency[2]
      };
    })
  });
}

function getCode(filepath) {
  return readFileCached(`${basePath}/${filepath}`, 'utf-8').then(content => {
    return content;
  });
}

function getProps(filepath) {
  return readFileCached(`${basePath}/${filepath}`, 'utf-8').then(content => {
    const strPropTypes = regMatch(/[^\.]+.propTypes\s?=\s{([\s\S]*)}/g, content);
    if (!strPropTypes || !strPropTypes.length) return [];
    // console.log('strPropTypes', strPropTypes);
    console.log(strPropTypes[0].split(','));
    const propTypes = strPropTypes[0].split(',')
      // Remove empty newlines
      .filter(p => p.length)
      // Remove React.PropTypes prefix and trailing commas
      .map(p => {
        p = p.replace(/React\.PropTypes\./g, '');
        p = p[p.length - 1] === ',' ? p.slice(0, -1) : p;
        return p;
      })
      // Extract prop name and prop type
      .reduce((o, p) => {
        const name = p.substr(0, p.indexOf(':')).trim();
        const type = p.substr(p.indexOf(':') + 1).trim();
        o.push({ name, type });
        return o;
      }, []);
    return propTypes;
  });
}

export default {
  getComponents,
  getChildren,
  getClassNames,
  getDependencies,
  getCode,
  getProps
}