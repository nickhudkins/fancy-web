/* globals webpackIsomorphicTools */
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import express from 'express';

import Relay from 'react-relay';
import IsomorphicRelayRouter from 'isomorphic-relay-router';

import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from 'routes';
import { Page } from './components/Page';

import config from '../../config';

const app = express();

const ASSETS_DIR = path.join(__dirname, '..', '..', 'dist');

app.use('/static', express.static(ASSETS_DIR));

const redirect = (loc, res) => {
  res.redirect(loc);
};


const writeNotFound = (res) => {
  res.send('404');
};

const networkLayer = new Relay.DefaultNetworkLayer(config.apiEndpoint);

app.get('*', (req, res, next) => {
  const assets = webpackIsomorphicTools.assets();
  if (process.env.NODE_ENV === 'production') {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.error(error);
      } else if (redirectLocation) {
        redirect(redirectLocation, res);
      } else if (renderProps) {
        const renderApp = ({ data, props }) => {
          const markup = renderToString(IsomorphicRelayRouter.render(props));
          const head = Helmet.rewind();
          const page = renderToString(<Page {...{ assets, markup, head, data }} />);
          res.send(page);
        };
        IsomorphicRelayRouter.prepareData(renderProps, networkLayer).then(renderApp, next);
      } else {
        writeNotFound(res);
      }
    });
  } else {
    res.send(
      renderToString(<Page {...{ assets }} />)
    );
  }
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://${config.host}:${config.port}`);
});
