/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import InputForm from 'src/components/InputForm';
import { sendMessage } from '../store/actions';

// Action Creators
const mapStateToProps = null;

// Actions
const mapDispatchToProps = dispatch => ({
  onSubmit: (value) => {
    dispatch(sendMessage(value));
  },
});

// Container
const InputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputForm);

/**
 * Export
 */
export default InputContainer;
