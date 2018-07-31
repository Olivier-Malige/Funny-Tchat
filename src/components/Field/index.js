/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Code
 */
class Field extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  handleChange = (evt) => {
    const { onChange } = this.props;
    const { value } = evt.target;
    onChange(value);
  }

  render() {
    const {
      name,
      className,
      placeholder,
      value,
    } = this.props;
    return (
      <input
        type="text"
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}

/**
 * Export
 */
export default Field;
