/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import Field from 'src/containers/Field';
import './connectForm.sass';

/**
 * Code
 */
class ConnectForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (evt) => {
    const { onSubmit } = this.props;
    evt.preventDefault();
    onSubmit(evt.target.querySelector('input').value);
  };

  render() {
    return (
      <form className="user-form columns is-centered flex" onSubmit={this.handleSubmit}>
        <Field
          name="userInput"
          placeholder="Enter a Nickname"
          className="input is-4 is-large column"
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
export default ConnectForm;
