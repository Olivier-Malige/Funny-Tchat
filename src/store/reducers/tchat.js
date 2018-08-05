/**
 * Initial state
 */
/**
 * Types
 */
// Form
import {
  SEND_MESSAGE,
  CLEAR_INPUT,
  ADD_MESSAGE,
  CHANGE_TCHAT_INPUT,
  CONNECT_WEBSOCKET,
  RECEIVE_MESSAGE,
  TEXT_COLOR,
  ADD_EMOJI,
} from 'src/store/types';

const initialState = {
  messages: [],
  input: '',
  textColor: '#000',
};


/**
 * Reducer
 */
let id = 0;
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      id += 1;
      const date = new Date();
      return {
        ...state,
        messages: [...state.messages, {
          user: action.value.user,
          text: action.value.text,
          color: state.textColor,
          time: `${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`,
          id,
        }],
      };
    }
    case CHANGE_TCHAT_INPUT:
      return {
        ...state,
        input: action.value,
      };

    case SEND_MESSAGE: {
      return {
        ...state,
        input: '',
      };
    }

    case TEXT_COLOR:
      return {
        ...state,
        textColor: action.value,
      };

    case CLEAR_INPUT:
      return {
        ...state,
        input: '',
      };

    case ADD_EMOJI:
      return {
        ...state,
        input: state.input + action.value,
      };

    default:
      return state;
  }
};

/**
 * Action creators
 */
export const sendMessage = value => ({
  type: SEND_MESSAGE,
  value,
});

export const addMessage = ({ value }) => ({
  type: ADD_MESSAGE,
  value,
});

export const changeTchatInput = ({ value }) => ({
  type: CHANGE_TCHAT_INPUT,
  value,
});

export const clearTchatInput = () => ({
  type: CLEAR_INPUT,
});

export const changeTextColor = value => ({
  type: TEXT_COLOR,
  value,
});

export const addEmojiToInput = value => ({
  type: ADD_EMOJI,
  value,
});
