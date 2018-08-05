
/**
 * Types
 */
import {
  CHANGE_LOGIN_INPUT,
  CONNECT_USER,
  LOGOUT_USER,
} from 'src/store/types';

/**
 * Initial state
 */
const initialState = {
  // Settings
  user: '',
  input: '',
};

/**
 * Reducer
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // Settings
    case CHANGE_LOGIN_INPUT:
      return {
        ...state,
        input: action.value,
      };
    case CONNECT_USER:
      return {
        ...state,
        user: action.user,
        input: '',
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: '',
      };

    default:
      return state;
  }
};

/**
 * Action creators
 */
export const changeLoginInput = ({ value }) => ({
  type: CHANGE_LOGIN_INPUT,
  value,
});

export const loginUser = user => ({
  type: CONNECT_USER,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

/**
 * Selectors
 */
