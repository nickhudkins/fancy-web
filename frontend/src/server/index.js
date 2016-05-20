import express from 'express';
global.Promise = require('../lib/utils/configureBluebird');

import config from '../../config';
const { host, port } = config;
import renderOnServer from './renderOnServer';

const app = express();

app.use('/static', express.static(config.assetsPath));

app.get('*', renderOnServer);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://${host}:${port}`);
});
