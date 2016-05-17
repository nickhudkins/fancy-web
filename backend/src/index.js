import 'babel-polyfill';
import express from 'express';

// import config from '../config.json';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import graphql from './middlewares/graphql';
import cors from 'cors';

const app = express();

app.use(cors());
app.use('/graphql', graphql);
app.use('/status', (req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);

const server = app.listen(3003, err => {
  if (err) {
    logger.error(err);
  } else {
    const { address, port } = server.address();
    logger.info(`Backend is listening at http://${address}:${port}`);

    if (process.send) {
      process.send('ready');
    }
  }
});
