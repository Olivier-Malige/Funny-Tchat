/**
 * Import
 */
import React from 'react';

/**
 * Local import
 */
// Composants
import InputLogin from 'src/containers/InputLogin';
// Styles et assets
import './login.sass';

/**
 * Code
 */
const Login = () => (
  <div id="login">
    <div>
      <h1 id="login-title" className="animated slower infinite pulse slow"><span>F</span>unny Tchat</h1>
      <h2 id="login-subtitle" className="animated slower lightSpeedIn ">Talking about what you want quickly and freely</h2>
    </div>
    <InputLogin />
  </div>
);

/**
 * Export
 */
export default Login;
