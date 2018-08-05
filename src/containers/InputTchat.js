/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import InputTchat from 'src/components/Tchat/InputTchat';
import { sendMessage, changeTchatInput } from 'src/store/reducers/tchat';

// Action Creators
const mapStateToProps = state => ({
  value: state.tchat.input,
  user: state.login.user,
  color: state.tchat.textColor,
});

// Actions
const mapDispatchToProps = dispatch => ({

  onChange: (value) => {
    dispatch(changeTchatInput({ value }));
  },

  onSubmit: (user, value) => {
    dispatch(sendMessage({ user, text: value }));
  },
});

// Container
const InputTchatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputTchat);

/**
 * Export
 */
export default InputTchatContainer;
