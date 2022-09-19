import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector, useDispatch } from '../../store/index'; 
import './style.scss';
import profile from "../../component/image/107161_circle_github_icon.png";
export const HomePage = () => {
  const {userData} = useSelector((state) => state.user)
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const target = useRef(null);
  return(
    <div>
      <nav>
        <img src={profile} alt="profile" className="github-icon"/>
        <div className="search">
          <input className='search-feild ' type="text" placeholder='Search for a user'  onClick={()=>{
            setSearchTerm("clicked")
          }} />
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
    </div>
  )
}