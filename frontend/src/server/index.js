import express from 'express';
import compression from 'compression';
global.Promise = require('../lib/utils/configureBluebird');

import config from '../../config';
const { host, port } = config;
import renderOnServer from './renderOnServer';

const app = express();
const oneDay = 86400000;
app.use(compression());

app.use('/static', express.static(config.assetsPath, { maxAge: oneDay * 365, fallthrough: true }));
app.get('/static/*', (req, res) => res.status(404).send('File not found.'));

app.get('*', renderOnServer);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://${host}:${port}`);
});
