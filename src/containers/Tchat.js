/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Tchat from 'src/components/Tchat';
import { connectWebSocket } from 'src/store/socketMiddleware';
import { logoutUser } from 'src/store/reducers/login';
import { changeTextColor, addEmojiToInput } from 'src/store/reducers/tchat';

// Action Creators
const mapStateToProps = state => ({
  user: state.login.user,
});

// Actions
const mapDispatchToProps = dispatch => ({
  connect: () => {
    dispatch(connectWebSocket());
  },
  disconnect: () => {
    dispatch(logoutUser());
  },
  changeTextColor: (color) => {
    dispatch(changeTextColor(color.hex));
  },
  addEmoji: (emoji) => {
    dispatch(addEmojiToInput(emoji.colons));
  },
});

// Container
const TchatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tchat);

/**
 * Export
 */
export default TchatContainer;
