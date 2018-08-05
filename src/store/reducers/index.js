/**
 * npm import
 */
import { combineReducers } from 'redux';

/**
 * Local import
 */
import login from 'src/store/reducers/login';
import tchat from 'src/store/reducers/tchat';


const reducers = combineReducers({
  login,
  tchat,
});

/**
 * Export
 */
export default reducers;
