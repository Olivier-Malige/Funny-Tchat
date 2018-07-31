/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import './messages.sass';

/**
 * Code
 */
class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="messages">
        {messages.map(message => (
          <div key={message.id} className="box column is-narrow animated fadeIn">
            <div>
              <strong>{message.user}</strong> <small>{message.time} </small>
            </div>
            <p
              style={{
                color: message.color,
              }}
              ref={(el) => {
                // for auto scrolling
                this.messagesEnd = el;
              }}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

/**
 * Export
 */
export default Messages;
