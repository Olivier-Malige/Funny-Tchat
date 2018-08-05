/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Messages from 'src/components/Tchat/Messages';
import { receiveMessage } from 'src/store/socketMiddleware';

// Action Creators
const mapStateToProps = state => ({
  messages: state.tchat.messages,
});

// Actions
const mapDispatchToProps = dispatch => ({
  receiveMessage: () => {
    dispatch(receiveMessage());
  },
});

// Container
const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);

/**
 * Export
 */
export default MessagesContainer;
