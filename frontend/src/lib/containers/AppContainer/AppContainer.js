import React, { Component } from 'react';
import Helmet from 'react-helmet';
import metaProps from 'siteHead.js';

export default class AppContainer extends Component { //eslint-disable-line

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>APP CONTAINER H1</h1>
        <Helmet {...metaProps } />
        { children }
      </div>
    );
  }
}
