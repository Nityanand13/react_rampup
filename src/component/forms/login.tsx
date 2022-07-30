import React from 'react';
import './login.css';
import profile from "../image/undraw_login_re_4vu2.svg";
const LoginPage =() =>{
  return(
    <div>
      <div className="login">
        <div className="sub-login">
        <div className="imgs">
          <div className="contanier-image">
            <img src={profile} alt="profile" className="profile"/>
          </div>
        </div>
        <div className="right">
          <div className="first-input">
            <input type="text" placeholder="email" className="name"/>
          </div>
          <div className="second-input">
            <input type="password" placeholder="password" className="name"/>
          </div>
          <div className="login-button">
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
