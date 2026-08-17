/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import Message from './Message';

import './messages.sass';

/**
 * Code
 */
class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  saveRef = (domElement) => {
    this.node = domElement;
  }

  scroll = () => {
    this.node.scrollTo(0, this.node.scrollHeight);
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="messages" ref={this.saveRef}>
        {messages.map(message => (
          <Message
            key={message.id}
            {...message}
          />
        ))}
      </div>
    );
  }
}

/**
 * Export
 */
export default Messages;
