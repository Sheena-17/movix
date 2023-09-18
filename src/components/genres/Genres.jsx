import { useSelector} from "react-redux/es/hooks/useSelector";
import "./style.scss";
export const Genres = ({data}) => {
    const genres = useSelector((state) => state.home.genres);
    return(
        <>
            <div className="genres">
                 {data?.map((g)=>{
                    if(!genres[g]?.name) return;
                      return <div className="genre" key = {g}>{genres[g]?.name}</div>
                 })}
            </div>
        </>
    )
}