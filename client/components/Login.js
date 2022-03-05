import React, { Component } from "react";

const handleCredentialResponse = (e) => {
  console.log("hi");
};

// class Login extends Component {
const Login = () => {
  return (
    <div id="sign-in">
      <div
        id="g_id_onload"
        data-client_id={process.env.CLIENT_ID}
        data-login_uri="http://localhost:8080"
        data-auto_prompt="false"
        data-callback="handleCredentialResponse"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  );
  //   }
};

export default Login;
