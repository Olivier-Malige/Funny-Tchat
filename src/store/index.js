/**
 * Npm import
 */
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';

/**
 * Local import
 */
// Reducer
import reducer from 'src/store/reducers/';
// Middlewares
import socket from './socketMiddleware';

/**
 * code
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// applyMiddleware applique le middleware dans le parcours de l'action
const appliedMiddleware = applyMiddleware(socket);

// Je transmets à mon store les middlewares / enhancers
const store = createStore(reducer, composeEnhancers(appliedMiddleware));

/**
 * Export
 */
export default store;
