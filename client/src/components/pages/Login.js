import React, { useState, useEffect } from "react";
import LoginForm from "../LoginForm.js";

function Login() {
  return (
    <div className="login-container">
      <div className="side-panel">
        <h2>Disclovery</h2>
      </div>
      <div className="main-content">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
