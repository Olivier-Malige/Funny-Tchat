/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import Field from 'src/containers/Field';
import './inputForm.sass';

/**
 * Code
 */
class InputForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (evt) => {
    const inputValue = evt.target.querySelector('input').value;
    const { onSubmit } = this.props;
    evt.preventDefault();
    if (inputValue !== '') {
      onSubmit(inputValue);
    }
  }

  render() {
    return (
      <form autoComplete="off" className="message-form columns" onSubmit={this.handleSubmit}>
        <Field
          name="messageInput"
          className="input is-large"
          placeholder="What do you want to say ?"
        />
        <button type="submit" className="button is-large">
          Say
        </button>
      </form>
    );
  }
}

/**
 * Export
 */
export default InputForm;
