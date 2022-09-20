import './style.scss';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ReactPaginate from 'react-paginate';
import profile from "..//../component/image/PngItem_1280311.png";
import { useSelector, useDispatch } from '../../store/index'; 
import { useEffect, useState } from 'react';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const ProfilePage = () => {
    const {token, userData} = useSelector((state) => state.user)
    const [userInfo,setUserInfo] = useState<any>();
    const [followersInfo,setFollowersInfo] = useState<any[]>([]);
    const [followingInfo,setFollowingInfo] = useState<any[]>([]);
    const { profileId } = useParams();
    const [currentPageForFollowers, setCurrentPageForFollowers] = useState(0);
    const [currentPageForFollowing, setCurrentPageForFollowing] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(true);
    const [ownProfile, setOwnProfile] = useState(false);
    const PER_PAGE = 4;
    
    const fetchUserInfo = async() =>{
      setLoading(true);
      if(userData?.login!==profileId) {
          setOwnProfile(false);
          isFollowingUser();
      }
      else {
          setOwnProfile(true);
      }
      const response = await axios.get('https://api.github.com/users/'+profileId);
      setUserInfo(response.data);
      console.log(response.data); 
    }

    useEffect(() =>{
        fetchUserInfo();
    },[profileId]);

    const fetchFollowersInfo = async() =>{
      const response = await axios.get('https://api.github.com/users/'+profileId+"/followers?page="+(currentPageForFollowers+1)+"&per_page="+PER_PAGE);
      setFollowersInfo(response.data);
    }

    const fetchFollowingInfo = async() =>{
        const response = await axios.get('https://api.github.com/users/'+profileId+"/following?page="+(currentPageForFollowing+1)+"&per_page="+PER_PAGE);
        setFollowingInfo(response.data);
    }
    
    useEffect(() =>{
        fetchFollowersInfo();
    },[profileId,currentPageForFollowers]);

    useEffect(() =>{
        fetchFollowingInfo();
    },[profileId,currentPageForFollowing]);

    function handlePageClickForFollowers({selected} : {selected:number}) {
        setCurrentPageForFollowers(selected)
    } 
    
    function handlePageClickForFollowing({selected} : {selected:number}) {
        setCurrentPageForFollowing(selected)
    }

    const isFollowingUser = async() =>{
        try {
            await axios({
                method: 'get',
                url: 'https://api.github.com/user/following/'+profileId,
                headers: {
                  Authorization: 'Bearer ' + token
                }
            })
            setIsFollowing(true);
        } catch(error:any) {
            setIsFollowing(false);
        }
    }
    const followUser = async() =>{
        await axios({
            method: 'put',
            url: 'https://api.github.com/user/following/'+profileId,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        setIsFollowing(true);
    }

    return(
      <div>
        {loading===false?
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>:
        <div className='profile-section'>
            <div className='profile-section-bio'>
                <img className='profile-section-pic' src={{userInfo}.userInfo?.avatar_url} alt="" />
                <h3>{{userInfo}.userInfo?.name}</h3>
                <p className='profile-section-name'>{profileId}</p>
                {!ownProfile&&<div>
                {isFollowing===true?
                    <button disabled={isFollowing}>Following</button>:
                    (<button onClick={(e)=>{
                        followUser();
                    }}>Follow</button>)
                }
                </div>}
                <p className='profile-section-follows' >{{userInfo}.userInfo?.followers} Followers </p>
                <p className='profile-section-follows'>{{userInfo}.userInfo?.following} Following </p>
            </div>
            <div className='profile-section-followers'>
                <h3>Followers</h3>
                <div className='info'>
                 {followersInfo.slice(0, PER_PAGE).map((res, index) => <> <div className='item'><Link to={"/profile/"+res.login}> <img src={res?.avatar_url} /></Link> <p>{res?.login}</p> </div> </> )}
                </div>
                <div className="paginate">
                <ReactPaginate className='pagination location'
                    previousLabel = {"<- Previous"}
                    nextLabel = {"Next ->"}
                    pageCount = {Math.ceil({userInfo}.userInfo?.followers / PER_PAGE)}
                    onPageChange = {handlePageClickForFollowers}
                    containerClassName = {"pagination"}
                    previousLinkClassName = {"pagination__link"}
                    nextClassName = {"pagination__link"}
                    disabledClassName = {"pagination__link--disabled"}
                    activeClassName = {"pagination__link--active"}
                />
                </div>
                <h3>Following</h3>
                <div className='info'>
                 {followingInfo.slice(0,PER_PAGE).map((res, index) => <> <div className='item'> <Link to={"/profile/"+res.login}> <img src={res?.avatar_url} /></Link> <p>{res?.login}</p> </div> </> )}
                </div>
                <div className="paginate">
                <ReactPaginate className='pagination location'
                    previousLabel = {"<- Previous"}
                    nextLabel = {"Next ->"}
                    pageCount = {Math.ceil({userInfo}.userInfo?.following / PER_PAGE)}
                    onPageChange = {handlePageClickForFollowing}
                    containerClassName = {"pagination"}
                    previousLinkClassName = {"pagination__link"}
                    nextClassName = {"pagination__link"}
                    disabledClassName = {"pagination__link--disabled"}
                    activeClassName = {"pagination__link--active"}
                />
                </div>
            </div>
        </div>}
      </div>
    )
}
