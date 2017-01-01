import mapper from './Mapper';
import express from 'express';
const app = express();

app.get('/', (req, res) => res.sendFile('index.html', {root: 'server/src'}));
app.get('/app.js', (req, res) => res.sendFile('web.bundle.js', {root: 'dist'}));

app.listen(7000);
console.log('Server running on port 7000');

