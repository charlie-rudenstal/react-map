import mapper from './Mapper';
import express from 'express';
const api = express();

api.get('/component/:path(*)', (req, res) => {
  const path = req.params.path;
  const name = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  Promise.all([
    mapper.getDependencies(path),
    mapper.getChildren(path),
    mapper.getClassNames(path)
  ])
  .catch(error => {
    res.status(400).json({error});
  })
  .then(([dependencies, children, classNames]) => {
    res.json({ name, dependencies, children, classNames });
  });
});

export default api;
