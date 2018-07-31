/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Messages from 'src/components/Messages';
import { receiveMessage } from '../store/actions';


// Action Creators
const mapStateToProps = state => ({
  messages: state.messages,
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
