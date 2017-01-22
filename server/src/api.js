import mapper from './Mapper';
import express from 'express';
const api = express();

api.get('/components', (req,res) => {
  mapper.getComponents()
  .catch(error => {
    res.status(500).json({error});
  })
  .then(components => {
    res.json({ components })
  });
})

api.get('/component/:path(*)', (req, res) => {
  const path = req.params.path;
  const name = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  Promise.all([
    mapper.getDependencies(path),
    mapper.getChildren(path),
    mapper.getClassNames(path),
    mapper.getCode(path),
    mapper.getProps(path)
  ])
  .catch(error => {
    res.status(400).json({error: error.toString()});
  })
  .then(([dependencies, children, classNames, code, props]) => {
    res.json({ name, path, dependencies, children, classNames, code, props });
  });
});

export default api;
