import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector, useDispatch } from '../../store/index'; 
import './style.scss';
import profile from "../../component/image/107161_circle_github_icon.png";
import image from "../../component/image/undraw_login_re_4vu2.svg";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const {token} = useSelector((state) => state.user)
  const {userData} = useSelector((state) => state.user)
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const target = useRef(null);
  const [firstUser, setFirstUser] = useState(0);
  const [secondUser, setSecondUser] = useState(1);
  const [thirdUser, setThirdUser] = useState(2);
  const [fourthUser, setFourthUser] = useState(3);
  const [viewprofile, setViewProfile] = useState('');
  const [users,setUsers] = useState<any[]>([]);
  const [followers,setFollowers] = useState<any[]>([]);
  const [searchedValue,setSearchedValue] = useState('');
  const fetchUsers = async() =>{
    const response = await axios.get('https://api.github.com/users?per_page=100')
    setUsers(response.data);
  }
  useEffect(() =>{
    fetchUsers()
  },[]);
  function setUsersOnRefresh(){
    setFirstUser((fourthUser+1)%100)
    setSecondUser((fourthUser+2)%100)
    setThirdUser((fourthUser+3)%100)
    setFourthUser((fourthUser+4)%100)
}
const followUser = async(user:any) =>{
  axios({
    method: 'put',
    url: 'https://api.github.com/user/following/'+user,
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
const navigate = useNavigate();
useEffect(()=>{
  if(users.length!=0){
    navigate("/search");
  }
},[searchedValue,navigate])

function setUsersToFollow(idx:Number){
  if (firstUser==idx) {
    setFirstUser(secondUser)
    setSecondUser(thirdUser)
    setThirdUser(fourthUser)
  }
  else if (secondUser==idx) {
    setSecondUser(thirdUser)
    setThirdUser(fourthUser)
  }
  else if (thirdUser==idx) {
    setThirdUser(fourthUser)
  }
  setFourthUser((fourthUser+1)%100)
}
const currentData = users.slice(0, 100).map((res, index) => <> <div className='users'> <img src={res.avatar_url} onClick={()=>{
  var viewprofile = {res}.res.login
  setViewProfile(viewprofile)
}} /> <p >{res.login}</p> 
<button className='follow-button' onClick={(event)=>{
    followUser({res}.res.login);
    var idx = {index}.index
  setUsersToFollow(idx)
 }}> Follow </button> <CloseButton key={index} className='close-button' onClick={()=>{
  var idx = {index}.index
  setUsersToFollow(idx)
 }} /> </div> </> )

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
            <img src={userData.avatar_url} alt="" />
          ) : (null)}
        </Button>
        <Overlay target={target.current} show={show} placement="bottom">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
            <div> Your Profile </div>
            </Tooltip>
          )}
        </Overlay>
      </nav>
      <div className='follow'>
        <div className='image'>
          <img src={image} alt="" />
        </div>
        <div className='whoToFollow'>
          <div className='whoToFollow-refresh'>
            <h3>Who To follow</h3>
            <button className='refresh' onClick={()=>{
              setUsersOnRefresh();
            }}>Refresh</button>
          </div>
          {currentData[firstUser]}
          {currentData[secondUser]}
          {currentData[thirdUser]}
          {currentData[fourthUser]}
        </div>
      </div>
    </div>
  )
}