/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Tchat from 'src/components/Tchat';
import { logoutUser } from 'src/store/reducers/login';
import { changeTextColor, addEmojiToInput, clearTchatInput } from 'src/store/reducers/tchat';

// Action Creators
const mapStateToProps = state => ({
  user: state.login.user,
});

// Actions
const mapDispatchToProps = dispatch => ({
  disconnect: () => {
    dispatch(logoutUser());
    dispatch(clearTchatInput());
  },
  changeTextColor: (color) => {
    dispatch(changeTextColor(color.hex));
  },
  addEmoji: (emoji) => {
    dispatch(addEmojiToInput(emoji.native));
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
