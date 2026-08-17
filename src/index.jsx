/**
 * NPM import
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.min.css';
import 'animate.css';

/**
 * Local import
 */
import App from 'src/containers/App';
import store from 'src/store';
import 'src/styles/index.sass';

/**
 * Code
 */
const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

createRoot(document.getElementById('root')).render(rootComponent);
