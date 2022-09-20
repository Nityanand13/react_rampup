import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './style.scss';

export const SearchPage = () => {
    const [users,setUsers] = useState<any>();
    const { searchId } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 10;
    const fetchData = async() =>{
        const response = await axios.get('https://api.github.com/search/users?per_page=10&page='+(currentPage+1)+'&q='+searchId)
        setUsers(response.data);
    }
    useEffect(() =>{
        fetchData();
    },[searchId,currentPage]);

    function handlePageClick({selected} : {selected:number}) {
        setCurrentPage(selected)
    }
    const pageCount = Math.ceil(users?.total_count/PER_PAGE); 
    return(
        <div>
            <div className='info'>
                {users?.items?.map((res:any, index:any) => 
                <> <div className='item'> <Link to={"/profile/"+res.login}><img src={res.avatar_url} /> </Link> 
                <p>{res.login}</p> </div> </> )}
            </div>
            <div className="paginate">
                <ReactPaginate
                previousLabel = {"<- Previous"}
                nextLabel = {"Next ->"}
                pageCount = {pageCount===undefined?0:pageCount}
                onPageChange = {handlePageClick}
                containerClassName = {"pagination"}
                previousLinkClassName = {"pagination__link"}
                nextClassName = {"pagination__link"}
                disabledClassName = {"pagination__link--disabled"}
                activeClassName = {"pagination__link--active"}
            />
            </div>
        </div>
    )
}
