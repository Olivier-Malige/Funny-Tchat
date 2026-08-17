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
  TEXT_COLOR,
  ADD_EMOJI,
} from 'src/store/types';

const HISTORY_MAX = 200;
const USERNAME_MAX = 32;
const MESSAGE_MAX = 2000;
const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

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
      const user = String(action.value.user || '').trim().slice(0, USERNAME_MAX);
      const text = String(action.value.text || '').trim().slice(0, MESSAGE_MAX);
      if (!user || !text) {
        return state;
      }
      return {
        ...state,
        messages: [...state.messages, {
          user,
          text,
          color: HEX_COLOR.test(action.value.color) ? action.value.color : '#000',
          time: `${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s`,
          id: action.value.id || id,
        }].slice(-HISTORY_MAX),
      };
    }
    case CHANGE_TCHAT_INPUT:
      return {
        ...state,
        input: String(action.value || '').slice(0, MESSAGE_MAX),
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
        textColor: HEX_COLOR.test(action.value) ? action.value : state.textColor,
      };

    case CLEAR_INPUT:
      return {
        ...state,
        input: '',
      };

    case ADD_EMOJI:
      return {
        ...state,
        input: (state.input + action.value).slice(0, MESSAGE_MAX),
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

export const addMessage = (value) => ({
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
