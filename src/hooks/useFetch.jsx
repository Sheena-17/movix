import { useEffect } from "react"
import { getApiConfiguration } from "../store/homeSlice";
import { fetchDataFromApi } from "../utils/api";
import { useState } from "react";

export const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLaoding] = useState(null);
     useEffect(()=>{
         setLaoding("Loading");
         setData(null);
         setError(null);
         fetchDataFromApi(url).then((response)=>{
            setLaoding(false);
            setData(response);
            console.log("Response of Api Calling in custom hook is : - ",response);
         }).catch((error)=>{
            setLaoding(false);
            setError("Something went wrong");
         })
     },[url])
     return {data,loading,error};
}