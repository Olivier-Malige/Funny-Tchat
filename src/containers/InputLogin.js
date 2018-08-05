/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import InputLogin from 'src/components/Login/InputLogin';
import { loginUser, changeLoginInput } from 'src/store/reducers/login';

// Action Creators
const mapStateToProps = state => ({
  value: state.login.input,
});

// Actions
const mapDispatchToProps = dispatch => ({
  onChange: (value) => {
    dispatch(changeLoginInput({ value }));
  },

  onSubmit: (user) => {
    if (user) {
      dispatch(loginUser(user));
    }
  },
});

// Container
const InputLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputLogin);

/**
 * Export
 */
export default InputLoginContainer;
