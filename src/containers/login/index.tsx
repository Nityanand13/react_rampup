import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from '../../store/index'; 
import {loginUser} from "../../store/actions/login";
import profile from "../../components/image/undraw_login_re_4vu2.svg";
import * as Constants from '../../constants/constants'
import '../../styles/sass/main.scss'

export const LoginPage = () => {
  const {error,userLoggedIn} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [personalAccessToken, setPersonalAccessToken] = useState("");
  const [usernameMissing, setUsernameMissing] = useState(false);
  const [personalAccessTokenMissing, setPersonalAccessTokenMissing] = useState(false);
  const [validateUserData, setvalidateUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(userLoggedIn){
      navigate("/");
    }
  },[userLoggedIn,navigate])

  useEffect(()=>{
    if(error !== ''&&loading==true){
      setvalidateUserData(true);
      setUsernameMissing(false);
      setPersonalAccessTokenMissing(false);
    }
  },[error,loading])

  function login() {
    setUsernameMissing(!username);
    setPersonalAccessTokenMissing(!personalAccessToken);
    if (!username || !personalAccessToken) {
      setvalidateUserData(false);
      return;
    }
    dispatch(loginUser(personalAccessToken,username));
  }
  function setLoader(){
      login();
  }

  return(
      <div className="login">
        <div className="sub-login">
        <div className="imgs">
          <div className="contanier-image">
            <img src={profile} alt="profile" className="profile"/>
          </div>
        </div>
        <div className="right">
          <div className="first-input">
            <input className="input-feild name" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
          </div>
          {usernameMissing &&  <p className='errors'>{Constants.EnterUserName}</p>}
          <div className="second-input">
            <input className="input-feild name" value={personalAccessToken} onChange={(e) => setPersonalAccessToken(e.target.value)} type="password" placeholder="Personal Access Token" />
            {personalAccessTokenMissing &&  <p className='errors'>{Constants.EnterPersonalAccessToken}</p>}
            {validateUserData &&  <p className='errors'>{error}</p>}
          </div>
          <div className="login-div">
          {userLoggedIn ? (
            <Spinner
              style = {{ marginBottom: 27 }}
              animation = "border"
              variant = "danger"
            />
          ) : null}
            <button className='login-button' onClick={()=>{
              setLoader()
            }} disabled={loading} >
              {loading && (
              <i
                className="fa fa-refresh fa-spin"
                style={{ marginRight: "5px" }}
               />
             )}
             {loading && <span>Logging</span>}
              {!loading && <span>Login</span>}
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}
