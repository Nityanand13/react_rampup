import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import profile from "../image/undraw_login_re_4vu2.svg";
import { useSelector, useDispatch } from 'react-redux'; 
import {incNumber,loginUser} from "../../store/actions/login";

console.log("7777777777777777");



const LoginPage = () => {
  console.log("11111111");
  
  interface RootState {
    changeTheNumber: number
    authorization: boolean
  }
  const myState = useSelector((state: RootState) => state.changeTheNumber)
  const autherization = useSelector((state: RootState) => state.authorization)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [personalAccessToked, setPersonalAccessToked] = useState("");
  // let username:string = "",personalAccessToked:string="";
  function daaku(){
    // dispatch ko hm action pass krte h
    // dispatch hai ye redux ko btata h ki action fire hua/ dispatch hua h
    // phir redux rootReducer ke pass jayega aur action match krega
    dispatch(incNumber())
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
    // ).then(res=>console.log("resresres",res) )
    dispatch(loginUser(personalAccessToked,username))
    console.log("autherizationautherization ",autherization, "autherization ",{autherization});
    
  }

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
          <div className="second-input">
            <input value={personalAccessToked} onChange={(e) => setPersonalAccessToked(e.target.value)} type="password" placeholder="personalAccessToked" className="name"/>
          </div>
          <input name="quanity" type="text" value={myState} />
          <div className="login-button">
            <button onClick={()=>daaku()}>Login</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage

// how to create input in react with state
// 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
