/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import './inputTchat.sass';
/**
 * Code
 */
class InputTchat extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  handleSubmit = (evt) => {
    const inputValue = evt.target.querySelector('input').value;
    const { onSubmit, user, color } = this.props;
    evt.preventDefault();
    if (inputValue !== '') {
      onSubmit(user, inputValue, color);
    }
  }

  handleChange = (evt) => {
    const { onChange } = this.props;
    const { value } = evt.target;
    onChange(value);
  }

  render() {
    const { value } = this.props;
    return (
      <form autoComplete="off" className="message-form columns" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="input is-large"
          placeholder="What do you want to say ?"
          onChange={this.handleChange}
          value={value}
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
export default InputTchat;
