/**
 * Types
 */

import {
  SEND_MESSAGE,
  ADD_MESSAGE,
  CHANGE_INPUT,
  CONNECT_USER,
  CONNECT_WEBSOCKET,
  RECEIVE_MESSAGE,
  LOGOUT_USER,
  TEXT_COLOR,
  ADD_EMOJI,

} from 'src/store/types';

/**
 * Action Creators
 */
export const connectWebSocket = () => ({
  type: CONNECT_WEBSOCKET,
});

export const sendMessage = value => ({
  type: SEND_MESSAGE,
  value,
});

export const receiveMessage = () => ({
  type: RECEIVE_MESSAGE,
});

export const changeInput = ({ name, value }) => ({
  type: CHANGE_INPUT,
  name,
  value,
});

export const addMessage = ({ user, value }) => ({
  type: ADD_MESSAGE,
  user,
  value,
});

export const loginUser = user => ({
  type: CONNECT_USER,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const changeTextColor = value => ({
  type: TEXT_COLOR,
  value,
});

export const addEmojiToInput = value => ({
  type: ADD_EMOJI,
  value,
});
