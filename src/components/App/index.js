/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import Login from 'src/components/Login';
import Tchat from 'src/containers/Tchat';
import './app.sass';

/**
 * Code
 */
class App extends React.Component {
  static propTypes = {
    connectServer: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
  };

  componentWillMount() {
    // TODO show messages if no server
    // Connection to socket.io
    const { connectServer } = this.props;
    connectServer();
  }

  render() {
    const {
      user,
    } = this.props;
    return (
      <div id="app" className="container is-fluid">
        {user === '' && (
          <Login />
        )}
        {user && (
          <Tchat />
        )}
      </div>
    );
  }
}

/**
 * Export
 */
export default App;
