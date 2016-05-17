import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute } from 'react-router';
import { AppContainer, NotFound } from 'lib/containers';

if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

const getIndex = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('lib/containers/Home/Home').default);
  });
};

const getAbout = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('lib/containers/About/About').default);
  });
};

const queries = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default (
  <Route path="/" component={ AppContainer }>
    <IndexRoute getComponent={ getIndex } queries={ queries } />
    <Route path="/about" getComponent={ getAbout } queries={ queries } />
    <Route path="*" status={ 404 } component={ NotFound } />
  </Route>
);
