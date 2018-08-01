/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
/**
 * Local import
 */
// Composants
import Messages from 'src/containers/Messages';
import InputForm from 'src/containers/InputForm';
import Close from 'react-icons/lib/fa/close';
// Styles et assets
import './tchat.sass';

/**
 * Code
 */
const Tchat = ({
  connect,
  disconnect,
  addEmoji,
  changeTextColor,
  connectedUser,
}) => (
  <div id="tchat">
    <header className="hero has-text-centered">
      <h1 className="title animated bounceIn ">Funny Tchat</h1>
    </header>
    <main id="tchat" className="columns">
      <div className="animated bounceInLeft column is-three-quarters">
        <Messages />
        <InputForm />
      </div>
      <aside className="animated bounceInRight column is-narrow">
        <div className="title box">
          <div className="user-name">
            {connectedUser}
          </div>
          <button onClick={disconnect} className="button is-narrow" type="button"><Close /></button>
        </div>
        <div className="tools">
          {/* Emoji Mart */}
          <Picker onSelect={addEmoji} set="emojione" />
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
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  addEmoji: PropTypes.func.isRequired,
  changeTextColor: PropTypes.func.isRequired,
  connectedUser: PropTypes.string.isRequired,
};
/**
 * Export
 */
export default Tchat;
