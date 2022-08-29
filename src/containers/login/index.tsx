import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { Spinner, Button } from "react-bootstrap";

import profile from "../image/undraw_login_re_4vu2.svg";
import { useSelector, useDispatch } from '../../store/index'; 
import {loginUser} from "../../store/actions/login";
import { Navigate,useNavigate } from "react-router-dom";


export const LoginPage = () => {
  console.log("11111111");
  const {token,userData,error,userLoggedIn,userLoggingIn} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [personalAccessToked, setPersonalAccessToked] = useState("");
  const [usernameMissing, setUsernameMissing] = useState(false);
  const [personalAccessTokenMissing, setPersonalAccessTokenMissing] = useState(false);
  const [validateUserData, setvalidateUserData] = useState(false);
  const [loader, setLoader] = useState(false);
  // let username:string = "",personalAccessToked:string="";
  const navigate = useNavigate();

  function Daaku2() {
    
    // const navigate = useNavigate();
    // if(localStorage.isLoggedin==="true"){
      // navigate("/");
    // }
    // console.log("payloadpayloadpayloadpayloadpayload ",initialState.userData);
    //  console.log("isLoggedInisLoggedInisLoggedIn ",localStorage.isLoggedin);
  }
  useEffect(()=>{
    if(userLoggedIn){
      navigate("/");
    }
    console.log("useEffectuseEffectuseEffectuseEffect ",localStorage.isLoggedin);
  },[userLoggedIn,navigate])

  useEffect(()=>{
    if(error !== ''){
      setvalidateUserData(true)
    }
  },[error])
  // useEffect(()=>{
  //   if(tokenState){

  //   }
  //   console.log("useEffectuseEffectuseEffectuseEffect ",localStorage.isLoggedin);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[tokenState])


  function daaku() {
    if(username===''){
      setUsernameMissing(true);
    }
    if(personalAccessToked===''){
      setPersonalAccessTokenMissing(true);
    }
    if(username===''||personalAccessToked===''){
      return
    }
    // if(localStorage.isLoggedin && localStorage.isLoggedin === "true"){
    //   return ""
    // }
    // dispatch ko hm action pass krte h
    // dispatch hai ye redux ko btata h ki action fire hua/ dispatch hua h
    // phir redux rootReducer ke pass jayega aur action match krega
    // dispatch(incNumber())

    // console.log("usernameusername",username,"personalAccessToked",personalAccessToked)
    // const config = {
    //   headers: { Authorization: `Bearer ${personalAccessToked}` }
    // };
    // axios.get( 
    //   'https://api.github.com/user',
    //   // bodyParameters,
    //   config
    // ).then(res=>console.log("resresres",dispatch(loginUser()))).catch(err=>console.log("Not authersied"));
    // axios.get(
    //   'https://api.github.com/user'
    // ).then(res=>console.log("resresres",res))
    dispatch(loginUser(personalAccessToked,username));
    
    // setTimeout(() => {  }, 1000);
  }
  function toggleLoader(){
    if (!loader) {
      setLoader(true);
    } else {
      setLoader(false);
    }
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
          {usernameMissing &&  <p>Please enter your username</p>}
          <div className="second-input">
            <input value={personalAccessToked} onChange={(e) => setPersonalAccessToked(e.target.value)} type="password" placeholder="personalAccessToked" className="name"/>
            {personalAccessTokenMissing &&  <p>Please enter your personal Access Token</p>}
            {validateUserData &&  <p>{error}</p>}
          </div>
          <div className="login-button">
          {loader ? (
            <Spinner
              style = {{ marginBottom: 27 }}
              animation = "border"
              variant = "danger"
            />
          ) : null}
            <button onClick={()=>{
              daaku()
              toggleLoader()
            }}>Login</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


export const HomePage = () => {

  return(
    <div>
      <h1>Hello</h1>
    </div>
  )
}


// how to create input in react with state
// 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


// error handle krna h ki dono feild hain ya nhi agr hain to validate
// check for loader aur loader chlte time login button ko disable
// store persist kese krni h ye explore krna h iske liye ek package h redux persist
// if login successfull then redirect to home page iske liye react router add krna hoga
// redirect shi se krna h signin ke baad
// useeffect dependency array explore


