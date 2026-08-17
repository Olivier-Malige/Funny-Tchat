/**
 * npm import
 */
import { io } from 'socket.io-client';

/**
 * Types import
 */
import {
  SEND_MESSAGE,
  CONNECT_USER,
  CONNECT_WEBSOCKET,
} from 'src/store/types';

/**
 * Local import
 */
// Actions
import config from 'src/config';
import { addMessage } from 'src/store/reducers/tchat';

export const connectWebSocket = () => ({
  type: CONNECT_WEBSOCKET,
});


/**
 * Code
 */

const socketIO = config.server ? io(config.server) : io();

let storeRef;

socketIO.on('send_message', (data) => {
  if (!storeRef) {
    return;
  }
  storeRef.dispatch(addMessage({
    user: data.username,
    text: data.message,
    color: data.color,
    id: data.id,
  }));
});

const socket = (store) => {
  storeRef = store;
  return (next) => (action) => {
    const state = store.getState();
    switch (action.type) {
      case SEND_MESSAGE:
        socketIO.emit('send_message', {
          username: state.login.user,
          message: action.value.text,
          color: state.tchat.textColor,
        });
        break;
      case CONNECT_USER:
        socketIO.emit('change_username', { username: action.user });
        break;
      default:
    }
    return next(action);
  };
};

/**
 * Export
 */
export default socket;
