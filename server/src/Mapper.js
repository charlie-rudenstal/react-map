import fs from 'mz/fs';
import { regMatch, memoize } from './utils';
const readFileCached = memoize(fs.readFile);
const basePath = "server/test/fixtures";

function getComponents() {
  return fs.readdir(basePath).then(listing => {
    return listing.map(filename => {
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

export default {
  getComponents,
  getChildren,
  getClassNames,
  getDependencies
}