import React, { Component } from 'react';
import Relay from 'react-relay';

class About extends Component {
  render() {
    return (
      <div>{ this.props.viewer.totalCount }</div>
    );
  }
}

export default Relay.createContainer(About, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        totalCount
      }
    `,
  },
});
