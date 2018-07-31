/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import ConnectForm from 'src/components/ConnectForm';
import { loginUser } from 'src/store/actions';

// Action Creators
const mapStateToProps = null;

// Actions
const mapDispatchToProps = dispatch => ({
  onSubmit: (user) => {
    if (user) {
      dispatch(loginUser(user));
    }
  },
});

// Container
const ConnectFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectForm);

/**
 * Export
 */
export default ConnectFormContainer;
