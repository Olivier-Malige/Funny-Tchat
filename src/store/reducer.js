
/**
 * Types
 */
import {
  SEND_MESSAGE,
  ADD_MESSAGE,
  CHANGE_INPUT,
  CONNECT_USER,
  LOGOUT_USER,
  TEXT_COLOR,
  ADD_EMOJI,
} from 'src/store/types';

/**
 * Initial State
 */
const initialState = {
  messageInput: '',
  connectedUser: '',
  messages: [],
  textColor: '#000',
};

/**
 * Traitements
 */

/**
 * Reducer
 */
let id = 0;
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messageInput: '',
      };
    case ADD_MESSAGE: {
      id += 1;
      const date = new Date();
      return {
        ...state,
        messages: [...state.messages, {
          user: action.user,
          text: action.value,
          color: state.textColor,
          time: `${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`,
          id,
        }],
      };
    }
    case CHANGE_INPUT:
      return {
        ...state,
        [action.name]: action.value,
      };
    case CONNECT_USER:
      return {
        ...state,
        connectedUser: action.user,
        userInput: '',
      };
    case LOGOUT_USER:
      return {
        ...state,
        connectedUser: '',
      };
    case TEXT_COLOR:
      return {
        ...state,
        textColor: action.value,
      };
    case ADD_EMOJI:
      return {
        ...state,
        messageInput: state.messageInput + action.value,
      };
    default:
      return state;
  }
};


/**
 * Export
 */
export default reducer;
