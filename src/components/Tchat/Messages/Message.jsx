/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Local import
 */

/**
 * Code
 */
const Message = ({
  text,
  user,
  color,
  time,
}) => (
  <div className="box column is-narrow animate__animated animate__fadeIn">
    <div>
      <strong>{user}</strong> <small>{time} </small>
    </div>
    <div style={{ color }}>
      {text}
    </div>
  </div>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

/**
 * Export
 */
export default Message;
