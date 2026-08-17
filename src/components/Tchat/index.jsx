/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
/**
 * Local import
 */
// Composants
import Messages from 'src/containers/Messages';
import InputTchat from 'src/containers/InputTchat';
import { FaTimes } from 'react-icons/fa';
// Styles et assets
import './tchat.sass';

const EmojiPicker = React.lazy(() => import('./EmojiPicker'));

/**
 * Code
 */
const Tchat = ({
  disconnect,
  addEmoji,
  changeTextColor,
  user,
}) => (
  <div id="tchat">
    <header className="hero has-text-centered">
      <h1 className="title animate__animated animate__bounceIn">Funny Tchat</h1>
    </header>
    <main className="columns tchat-layout">
      <div className="animate__animated animate__bounceInLeft column is-three-quarters">
        <Messages />
        <InputTchat />
      </div>
      <aside className="animate__animated animate__bounceInRight column is-narrow">
        <div className="title box">
          <div className="user-name">
            {user}
          </div>
          <button onClick={disconnect} className="button is-narrow" type="button" aria-label="Logout">
            <FaTimes />
          </button>
        </div>
        <div className="tools">
          {/* Emoji Mart */}
          <React.Suspense fallback={null}>
            <EmojiPicker onSelect={addEmoji} />
          </React.Suspense>
          <div className="box">
            <p>Text color</p>
            <CirclePicker onChange={changeTextColor} />
          </div>
        </div>
      </aside>
    </main>
  </div>
);
Tchat.propTypes = {
  disconnect: PropTypes.func.isRequired,
  addEmoji: PropTypes.func.isRequired,
  changeTextColor: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};
/**
 * Export
 */
export default Tchat;
