import fs from 'mz/fs';
import { regMatch } from './utils';

function getComponents(dirPath) {
  return fs.readdir(dirPath).then(listing => {
    return listing.map(filename => {
      const name = filename.slice(0, filename.lastIndexOf('.'));
      return {
        name,
        path: `${dirPath}/${filename}`
      };
    })
  });
}

function getChildren(filePath) {
  return fs.readFile(filePath, 'utf-8').then(content => {
    const tags = content.match(/<([^/][^>]+)>/g);
    const tagNames = tags.map(tag => tag.slice(1, tag.indexOf(' ')));
    const uniqueTagNames = [...new Set(tagNames)];
    return uniqueTagNames.map(name => {
      return { name };
    });
  });
}

function getClassNames(filePath) {
  return fs.readFile(filePath, 'utf-8').then(content => {
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

function getDependencies(filePath) {
  return fs.readFile(filePath, 'utf-8').then(content => {
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