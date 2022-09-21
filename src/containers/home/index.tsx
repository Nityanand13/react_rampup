import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector, useDispatch } from '../../store/index'; 
import CloseButton from 'react-bootstrap/CloseButton';
import './style.scss';
import axios from 'axios';
import image from "../../component/image/undraw_login_re_4vu2.svg";
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const {token} = useSelector((state) => state.user)
  const [users,setUsers] = useState<any>();
  const [userToDisplay,setUserToDisplay] = useState<any[]>([]);
  const [pageNumber,setPageNumber] = useState(1);
  const [userIndex,setUserIndex] = useState(0);
  const fetchUsers = async() =>{
    setUserIndex(0);
    const response = await axios.get('https://api.github.com/search/users?per_page=60&page='+pageNumber+'&q=followers:>1000')
    setUsers(response.data);
  }

  const isFollowingUser = async(userId:any) => {
   var statusCode=0;
   await axios({
      method: 'get',
      url: 'https://api.github.com/user/following/'+userId,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response)=>{
      statusCode = response.status;
    }).catch(()=>{
      statusCode= 404;
    })
    return statusCode;
  }

  const validUsers = async() => {
    if(users===undefined) {
      return;
    }

    for(var i=userIndex;i<users?.items.length;i++) {
      var statusCode = await isFollowingUser(users?.items[i].login)
      setUserIndex(i);
      if(statusCode==404) {
        if(userToDisplay.length!=4) {
          userToDisplay.push(users?.items[i])
          setUserToDisplay(userToDisplay)
        }
        else {
          break;
        }
      }
      if(i==users?.items.length-1&&userToDisplay.length!=4){
        setPageNumber(pageNumber+1);
        fetchUsers();
      }
    }
  }

  function removeUser(index: number) {
    setUserToDisplay([
      ...userToDisplay.slice(0, index),
      ...userToDisplay.slice(index + 1, userToDisplay.length)
    ]);
  }

  function refreshUsers() {
    setUserToDisplay([]);
  }

  const followUser = async(userId:any) =>{
    await axios({
        method: 'put',
        url: 'https://api.github.com/user/following/'+userId,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
  }
  
  useEffect(() =>{
    fetchUsers()
  },[]);

  useEffect(() =>{
    validUsers()
  },[users,userToDisplay]);

  return(
    <div>
      <div className='follow'>
        <div className='image'>
          <img src={image} alt="" />
        </div>
        <div className='whoToFollow'>
          <div className='whoToFollow-refresh'>
            <h3>Who To follow</h3>
            <button className='refresh' onClick={()=>{
              refreshUsers();
            }}>Refresh</button>
          </div>
          {
            userToDisplay?.map((res, index) => <> <div className='users'><Link to={"/profile/"+res.login}><img src={res.avatar_url}/></Link><p >{res.login}</p> 
            <button className='follow-button' onClick={(event)=>{
                followUser({res}.res.login).then(()=>{
                  removeUser(index);
                });
             }}> Follow </button> <CloseButton key={index} className='close-button' onClick={()=>{
                removeUser(index);
             }} /> </div> </> )
          }
        </div>
      </div>
    </div>
  )
}
