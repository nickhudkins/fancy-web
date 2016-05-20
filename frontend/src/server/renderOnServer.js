/* globals webpackIsomorphicTools */
import config from '../../config';
import Relay from 'react-relay';
import React from 'react';
import Helmet from 'react-helmet';
import IsomorphicRelayRouter from 'isomorphic-relay-router';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from 'routes';
import { Page } from './components/Page';

const redirect = (loc, res) => {
  res.redirect(loc);
};

const writeNotFound = (res) => {
  res.send('404');
};

const networkLayer = new Relay.DefaultNetworkLayer(config.apiEndpoint);
const { googleAnalyticsId } = config;

export default (req, res, next) => {
  const assets = webpackIsomorphicTools.assets();
  if (process.env.NODE_ENV === 'production') {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        throw error;
      } else if (redirectLocation) {
        redirect(redirectLocation, res);
      } else if (renderProps) {
        const renderApp = ({ data, props }) => {
          const markup = renderToString(IsomorphicRelayRouter.render(props));
          const head = Helmet.rewind();
          const page = renderToString(
            <Page {...{ assets, markup, googleAnalyticsId, head, data }} />
          );
          res.send(`<!DOCTYPE html>${page}`);
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
};
