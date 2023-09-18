import { SwitchTabs } from "../../components/switchTabs/SwitchTabs";
import { HeroBanner } from "./heroBanner/HeroBanner";
import { Popular } from "./popular/Popular";
import "./style.scss";
import { TopRated } from "./topRated/TopRated";
import { Trending } from "./trending/trending";
export const Home = () => {
    return(
        <>
         <div><HeroBanner/>
         <Trending/>
         <Popular/>
         <TopRated/>
         {/* <div style = {{height: 1000}}/> */}
         </div>
        </>
    )
}