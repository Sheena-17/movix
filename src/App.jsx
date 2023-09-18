import { fetchDataFromApi } from "./utils/api";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import { getGenres } from "./store/homeSlice";
import { BrowserRouter,Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { Details } from "./pages/details/details";
import { SearchResult } from "./pages/searchResult/SearchResult";
import { PageNotFound } from "./pages/404/PageNotFound";
import Explore from "./pages/explore/explore";
import { Header } from "./components/header/Header";
import Footer from "../src/components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => {console.log("State is: - ",state);
    return state.home.url});
  
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((response)=>{
      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster:   response.images.secure_base_url + "original",
        profile:  response.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
      console.log("Response is : - ",response);
    })
  }

  const genresCall = async() =>{
        let promises = [];
        let endpoints = ["tv", "movie"];
        let allGenres = {};
        endpoints.forEach((url) =>{
          promises.push(fetchDataFromApi(`genre/${url}/list`))
        })
        const data = await Promise.all(promises);
        console.log("data for the list of movie and tv show list is : - ",data);
        data.map(({genres}) =>{
          return genres.map((item) => (allGenres[item.id]=item))
        })
        dispatch(getGenres(allGenres));
        console.log("allGeneres is : -" ,allGenres);  
  }
  return (
      <BrowserRouter>
      <Header/>
           <Routes>
               <Route path = "/" element = {<Home/>} />
               <Route path = "/:mediaType/:id" element = {<Details/>} /> 
               <Route path = "/search/:query" element = {<SearchResult/>} />
               <Route path = "/explore/:mediaType" element = {<Explore/>} />
               <Route path = "*" element = {<PageNotFound/>} />
           </Routes>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
