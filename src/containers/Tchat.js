/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Tchat from 'src/components/Tchat';
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
