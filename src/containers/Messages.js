/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Messages from 'src/components/Tchat/Messages';

// Action Creators
const mapStateToProps = state => ({
  messages: state.tchat.messages,
});

// Container
const MessagesContainer = connect(mapStateToProps)(Messages);

/**
 * Export
 */
export default MessagesContainer;
