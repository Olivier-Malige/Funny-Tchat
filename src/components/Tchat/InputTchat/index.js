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

  constructor(props) {
    super(props);
    this.refTextArea = React.createRef();
    this.refForm = React.createRef();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const inputValue = evt.target.querySelector('textarea').value;
    const { onSubmit, user, color } = this.props;
    if (inputValue !== '') {
      onSubmit(user, inputValue, color);
    }
  }

  handleChange = (evt) => {
    const { onChange } = this.props;
    const { value } = evt.target;
    onChange(value);
  }

  handleKeyDown = (evt) => {
    const area = this.refTextArea.current;
    const form = this.refForm.current;
    const { onSubmit, user, color } = this.props;
    if (evt.which === 13 && !evt.shiftKey && area.value !== '') {
      evt.preventDefault();
      onSubmit(user, area.value, color);
    }
  }

  render() {
    const { value } = this.props;
    return (
      <form autoComplete="off" className="message-form columns" onSubmit={this.handleSubmit} ref={this.refForm}>
        <textarea
          ref={this.refTextArea}
          type="text"
          className="input is-large"
          placeholder="What do you want to say ?"
          onChange={this.handleChange}
          value={value}
          onKeyDown={this.handleKeyDown}
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
