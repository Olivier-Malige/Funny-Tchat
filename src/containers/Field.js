/**
 * Npm import
 */
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart'

/**
 * Local import
 */
import Field from 'src/components/Field';
import { changeInput } from 'src/store/actions';

// Action Creators
const mapStateToProps = (state, ownProps) => ({
  value: state[ownProps.name],
});

// Actions
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (value) => {
    dispatch(changeInput({ name: ownProps.name, value }));
  },
});

// Container
const FieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Field);

/**
 * Export
 */
export default FieldContainer;
