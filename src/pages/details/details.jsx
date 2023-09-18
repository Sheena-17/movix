import "./style.scss";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { DetailsBanner } from "./detailsBanner/DetailsBanner";
import Cast from "../../components/cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
export const Details = () => {
    const params = useParams();
    const {mediaType, id} = params;
    const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
    console.log("Videoes data is : -" ,data);
    const {data:credits,loading: creditLoading} = useFetch(`/${mediaType}/${id}/credits`);
    return(
        <>
        <div><DetailsBanner video = {data?.results?.[0]} crew = {credits?.crew}/>
        <VideosSection data = {data} loading = {loading}/>
        <Cast data = {credits?.cast} loading= {creditLoading}/>
        <Similar mediaType = {mediaType} id = {id}/>
        <Recommendation mediaType = {mediaType} id = {id}/>
        </div>
        </>
    )
}