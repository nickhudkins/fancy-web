import React, { Component } from 'react';
import Relay from 'react-relay';

class About extends Component {
  componentDidMount() {
    setTimeout(() => {
      const baz = () => {
        throw new Error('TEST_EXCEPTION');
      };
      const bar = () => {
        baz();
      };
      const foo = () => {
        bar();
      };
      foo();
    }, 1000);
  }

  render() {
    return (
      <div>Relay DATA: { this.props.viewer.totalCount }</div>
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
