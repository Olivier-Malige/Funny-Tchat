/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import App from 'src/components/App';
import { connectWebSocket } from 'src/store/socketMiddleware';
import { logoutUser } from 'src/store/reducers/login';
import { changeTextColor, addEmojiToInput } from 'src/store/reducers/tchat';

// Action Creators
const mapStateToProps = state => ({
  user: state.login.user,
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
