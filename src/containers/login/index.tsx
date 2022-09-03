import 'font-awesome/css/font-awesome.min.css';

import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from '../../store/index'; 
import {loginUser} from "../../store/actions/login";
import { useNavigate } from "react-router-dom";
import profile from "..//../component/image/undraw_login_re_4vu2.svg";
import './style.scss';



export const LoginPage = () => {
  const {error,userLoggedIn} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [personalAccessToked, setPersonalAccessToked] = useState("");
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
    if(error !== ''){
      setvalidateUserData(true);
      setUsernameMissing(false);
      setPersonalAccessTokenMissing(false);
    }
  },[error])

  function login() {
    if(username===''&&personalAccessToked===''){
      setUsernameMissing(true);
      setPersonalAccessTokenMissing(true);
      setvalidateUserData(false);
      return;
    }
    if(username===''){
      setUsernameMissing(true);
      setPersonalAccessTokenMissing(false);
      setvalidateUserData(false);
      return;
    }
    if(personalAccessToked===''){
      setUsernameMissing(false);
      setPersonalAccessTokenMissing(true);
      setvalidateUserData(false);
      return;
    }
    if(username===''||personalAccessToked===''){
      return;
    }
    dispatch(loginUser(personalAccessToked,username));
  }
  function setLoader(){
      setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login()
    }, 100);
  };

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
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="name"/>
          </div>
          {usernameMissing &&  <p className='errors'>Please enter your username</p>}
          <div className="second-input">
            <input value={personalAccessToked} onChange={(e) => setPersonalAccessToked(e.target.value)} type="password" placeholder="personalAccessToked" className="name"/>
            {personalAccessTokenMissing &&  <p className='errors'>Please enter your personal Access Token</p>}
            {validateUserData &&  <p className='errors'>{error}</p>}
          </div>
          <div className="login-button">
          {userLoggedIn ? (
            <Spinner
              style = {{ marginBottom: 27 }}
              animation = "border"
              variant = "danger"
            />
          ) : null}
            <button onClick={()=>{
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
    </div>
  )
}