/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Formatizer } from 'formatizer';
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
  <div className="box column is-narrow animated fadeIn">
    <div>
      <strong>{user}</strong> <small>{time} </small>
    </div>
    <div style={{ color }}>
      <Formatizer>
        {text}
      </Formatizer>
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
