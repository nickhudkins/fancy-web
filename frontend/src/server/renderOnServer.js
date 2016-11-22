import config from '../../config';
import Relay from 'react-relay';
import React from 'react';
import Helmet from 'react-helmet';
import IsomorphicRelayRouter from 'isomorphic-relay-router';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from 'routes';
import { Page } from './components/Page';
import { renderStatic } from 'glamor/server';

const redirect = (loc, res) => {
  res.redirect(loc);
};

const writeNotFound = (res) => {
  res.send('404');
};

const networkLayer = new Relay.DefaultNetworkLayer(config.apiEndpoint);
const { googleAnalyticsId } = config;

export default (req, res, next) => {
  /*
    On the server, we want to get mappings to asset files rather than injecting
    the compiled assets at runtime. This is how we get those.
    TODO: Determine if we need to call this at request time. I presume we do not
    due to the fact that the assets should only change between deploy, and therefore
    would only need to be "resolved" once.
  */

  if (process.env.NODE_ENV === 'production') {
    const renderApp = ({ data, props }) => {
      const { html: markup, css } = renderStatic(() => renderToString(IsomorphicRelayRouter.render(props)));
      const head = Helmet.rewind();
      const page = renderToString(
        <Page
          assets={{
            style: css,
            javascript: {
              app: '/static/app.bundle.js',
              vendor: '/static/vendor.bundle.js'
            }
          }}
          markup={ markup }
          googleAnalyticsId={ googleAnalyticsId }
          head={ head }
          data={ data }
        />
      );
      const isNotFound = props.routes.filter(({ status }) => status === 404).length > 0;
      res.status(isNotFound ? 404 : 200).send(`<!DOCTYPE html>${page}`);
    };

    /*
      We're in production, so we want to do as much stuff server-side as we can.
      We fetch data, render the page, including head / meta, and all that jazz...
      Standard React Router stuff going on here for the most part.
    */


    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        throw error;
      } else if (redirectLocation) {
        redirect(redirectLocation, res);
      } else if (renderProps) {
        IsomorphicRelayRouter
          .prepareData(renderProps, networkLayer)
          .then(renderApp, next);
      } else {
        writeNotFound(res);
      }
    });
  } else {
    /*
      When not in production, we can simply render an empty page, no need to do server side
      data fetching etc... This will keep hot loading from throwing annoying checksum errors.
    */
    res.send(
      renderToString(<Page assets={{
        javascript: {
          app: 'http://localhost:1338/static/app.bundle.js',
          vendor: 'http://localhost:1338/static/vendor.bundle.js'
        }}} />)
    );
  }
};
