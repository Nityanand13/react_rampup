import { useEffect, useState, useRef } from 'react';
import React, { Component }  from 'react';
import { useSelector, useDispatch } from '../../store/index'; 
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import profile from "../image/107161_circle_github_icon.png";
import '../../styles/sass/main.scss'
import { useNavigate,Link } from "react-router-dom";

export const Navbar = () => {
  const {userData} = useSelector((state) => state.user)
  const [searchedValue,setSearchedValue] = useState('');
  const target = useRef(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  useEffect(()=>{
  if(searchedValue.length!=0){
    navigate("/search/"+searchedValue);
  }
 },[searchedValue,navigate])

    return(
        <div>
           <nav>
        <img src={profile} alt="profile" className="github-icon"/>
        <div className="search">
          <input className='search-feild ' type="text" placeholder='Search for a user'
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setSearchedValue(event.target.value)
            }
          }}
          />
        </div>
        <Button  className="avatar" ref={target} onClick={() => setShow(!show)}>
          {userData ? (
            <img src={userData?.avatar_url} alt="" />
          ) : (null)}
        </Button>
        <Overlay target={target.current} show={show} placement="bottom">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
            <Link to={"/profile/"+userData?.login}><button className='your-profile'>Your Profile</button></Link>
            </Tooltip>
          )}
        </Overlay>
      </nav>
        </div>
    )
}