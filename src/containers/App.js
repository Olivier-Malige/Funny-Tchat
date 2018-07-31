/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import App from 'src/components/App';
import {
  connectWebSocket,
  logoutUser,
  changeTextColor,
  addEmojiToInput,
} from 'src/store/actions';

// Action Creators
const mapStateToProps = state => ({
  connectedUser: state.connectedUser,
});

// Actions
const mapDispatchToProps = dispatch => ({
  connectServer: () => {
    dispatch(connectWebSocket());
  },
});

// Container
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

/**
 * Export
 */
export default AppContainer;
