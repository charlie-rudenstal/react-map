import fs from 'mz/fs';

function getComponentList(path) {
  return fs.readdir(path).then(listing => {
    return listing.map(filename => {
      const name = filename.slice(0, filename.lastIndexOf('.'));
      return {
        name,
        path: `${path}/${filename}`
      };
    })
  });
}

export default {
  getComponentList
}