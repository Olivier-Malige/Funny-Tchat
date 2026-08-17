import React from 'react';
import PropTypes from 'prop-types';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

/** Isolated so emoji-mart data is loaded in its own chunk. */
const EmojiPicker = ({ onSelect }) => (
  <Picker data={data} onEmojiSelect={onSelect} previewPosition="none" theme="light" />
);

EmojiPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default EmojiPicker;
