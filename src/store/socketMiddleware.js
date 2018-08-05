/**
 * npm import
 */
import io from 'socket.io-client';

/**
 * Types import
 */
import {
  SEND_MESSAGE,
  CONNECT_USER,
  CONNECT_WEBSOCKET,
  RECEIVE_MESSAGE,
} from 'src/store/types';

/**
 * Local import
 */
// Actions
import config from 'src/config';
import { addMessage } from 'src/store/reducers/tchat';

export const receiveMessage = () => ({
  type: RECEIVE_MESSAGE,
});

export const connectWebSocket = () => ({
  type: CONNECT_WEBSOCKET,
});


/**
 * Code
 */

const socketIO = io(config.server);

const socket = store => next => (action) => {
  const state = store.getState();
  switch (action.type) {
    case CONNECT_WEBSOCKET:
      store.dispatch(receiveMessage());
      break;
    case RECEIVE_MESSAGE:
      socketIO.on('user_left', (data) => {
        console.log(data.userNumbers);
      });
      socketIO.on('send_message', (data) => {
        store.dispatch(addMessage({
          user: data.username,
          value: data.message,
        }));
      });
      break;
    case SEND_MESSAGE:
      socketIO.emit('send_message', {
        username: state.connectedUser,
        message: action.value,
      });
      break;
    case CONNECT_USER:
      socketIO.emit('change_username', { username: action.user });
      break;
    default:
  }
  next(action);
};

/**
 * Export
 */
export default socket;
