import api from './api';
import express from 'express';
const app = express();

const sendWebPage = (req, res) =>
  res.sendFile('index.html', {root: 'server/src'});

const sendComponentPage = (req, res) =>
  res.sendFile('component.html', { root: 'server/src' });

const sendWebBundle = (req, res) =>
  res.sendFile('web.bundle.js', { root: 'dist' });

const sendMappedComponentsBundle = (req, res) =>
  res.sendFile('mappedComponents.bundle.js', {root: 'dist'});

app.get('/', sendWebPage);
app.get('/render/component/(*)/', sendComponentPage);
app.get('/component/(*)', sendWebPage);
app.get('/app.js', sendWebBundle);
app.get('/mappedComponents.js', sendMappedComponentsBundle);
app.use('/api', api);

app.listen(7000);
console.log('Server running on port 7000');

export default app;
