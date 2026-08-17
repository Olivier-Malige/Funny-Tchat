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
      <h1 id="login-title" className="animate__animated animate__slower animate__infinite animate__pulse"><span>F</span>unny Tchat</h1>
      <h2 id="login-subtitle" className="animate__animated animate__lightSpeedIn">Talking about what you want quickly and freely</h2>
    </div>
    <InputLogin />
  </div>
);

/**
 * Export
 */
export default Login;
