/* globals __API_ENDPOINT__ */
import 'babel-polyfill';
window.Promise = require('../lib/utils/configureBluebird');

import './errorHandler';
import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import { match, Router, browserHistory } from 'react-router';
import routes from 'routes';

const environment = new Relay.Environment();
environment.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(__API_ENDPOINT__)
);

if (process.env.NODE_ENV === 'production') {
  const data = JSON.parse(document.getElementById('preloadedData').textContent);
  IsomorphicRelay.injectPreparedData(environment, data);
}

const rootElement = document.getElementById('root');
match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
    render(<Router {...props} />, rootElement);
  });
});
