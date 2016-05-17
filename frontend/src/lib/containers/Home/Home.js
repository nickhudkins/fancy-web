import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Home.scss';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
        <h1 className={styles.title}>Home!</h1>
        <Link to="/about">About</Link>
      </div>
    );
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
});
