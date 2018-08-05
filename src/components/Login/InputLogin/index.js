/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import './inputLogin.sass';

/**
 * Code
 */
class InputLogin extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  handleSubmit = (evt) => {
    const { onSubmit } = this.props;
    evt.preventDefault();
    onSubmit(evt.target.querySelector('input').value);
  };

  handleChange = (evt) => {
    const { onChange } = this.props;
    const { value } = evt.target;
    onChange(value);
  }

  render() {
    const { value } = this.props;
    return (
      <form className="user-form columns is-centered flex" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Nickname"
          className="input is-4 is-large column"
          onChange={this.handleChange}
          value={value}
        />
        <button type="submit" className="button is-large is-narrow">
          Join
        </button>
      </form>
    );
  }
}

/**
 * Export
 */
export default InputLogin;
