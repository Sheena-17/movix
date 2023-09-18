import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useRef } from "react";
import Img from "../lazyLoadingImage/img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import { CircleRating } from "../circleRating/CircleRating";
import { Genres } from "../genres/Genres";


export const Carousel = ({data,loading,endpoint,title}) => {
    const navigate = useNavigate();
    console.log("data in the carousel component is : - ",data);
    const navigation = (dir) => {
         const container = carouselContainer.current;
         const scrollAmount = carouselContainer.dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
         container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
         })
    }
    const carouselContainer = useRef();
    const url = useSelector((state) => state.home.url);
    console.log("Url in the carousel section is : -" ,url);

    const skItem = () => {
        return(
            <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
         </div>
        )
    }
     return(
        <>
            <div className="carousel">
                <ContentWrapper>
                    {title && <div className="carouselTitle">{title}</div>}
                    <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")}/>
                    <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation("right")}/>
                     {!loading?
                     (<div className="carouselItems" ref = {carouselContainer}>
                        {data?.map((item)=>{
                            const posterUrl = item.poster_path? url.poster+ item.poster_path: PosterFallback;
                            return (
                                <div className="carouselItem" key = {item.id} onClick = {()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        <Img src = {posterUrl} />
                                        <CircleRating rating = {item.vote_average.toFixed(1)}/>
                                        <Genres data = {item.genre_ids.slice(0,2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title||item.name}</span>
                                        <span className="date">{dayjs(item.release_Date).format("MMM D,YYYY")}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>):
                    <div className="loadingSkeleton">
                      {skItem()}
                      {skItem()}
                      {skItem()}
                      {skItem()}
                      {skItem()}
                    </div>
                    }
                </ContentWrapper>
            </div>
        </>
     )
}