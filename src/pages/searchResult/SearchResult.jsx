import "./style.scss";
import React from "react";
import { useState,useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";

export const SearchResult = () => {
    const [data,setData] = useState(null);
    const [pageNum,setPageNum] = useState(1);
    const [loading,setLoading] = useState(false);
    const {query} =useParams();
     
    useEffect(()=>{
        setPageNum(1);
        fetchInitialData(); 
    },[query]);

    const fetchInitialData = () =>{
        setLoading(true);
        fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`).then((response)=>{
            console.log("Data in the 1st page is : - " , response);
            setData(response);
            setPageNum((pre)=>pre+1);
            setLoading(false);
        });
    }

    const fetchNextPageData=() =>{
       

        setLoading(true);
        fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`).then((response)=>{
            console.log("Data in the 2nd page is : - " , response);
            if(data.results){
                setData({...data,results:[...data.results,...response.results]})
            }
            else{
                setData(result);
            }
            setLoading(false);
        });
    }
    return(
        <>
         <div className="searchResultsPage">
            {loading && <Spinner initial = {true}/>}
            {!loading && <ContentWrapper>
                   {data?.results?.length>0?(<>
                    <div className="pageTitle">
                      {`Search ${data.total_results>1?"results":"result"} of ${query}`}
                   </div>
                   <InfiniteScroll className="content" dataLength={data?.results?.length||0}
                    next = {fetchNextPageData}
                     hasMore = {pageNum <= data?.total_pages}
                     loader = {<Spinner/>}>
                    {data?.results?.map((item,index) => {
                        if(item.media_type === "person") return;
                        return(
                            <MovieCard key = {index} data = {item} fromSearch = {true}/>
                        )
                    })}
                   </InfiniteScroll>
                   </>
                   )
                   :<span className="resultNotFound">
                               Sorry Results not found
                   </span>
                   }
                </ContentWrapper>}
         </div>
        </>
    )
}