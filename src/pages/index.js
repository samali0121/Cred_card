import HeroSec from "../components/HeroSec";
import MultiCard from "../components/MultiCard";
// import ScrollPlaySection from "../components/CanvasSec";
import ScrollCanvas from "../components/ScrollCanvas";
import SingleCard from "../components/SingleCard";
import CardsSteps from "../components/CardsSteps";

export default function Home() {
    return (
        <div>
            <HeroSec />
            <MultiCard />
            {/* <ScrollPlaySection/> */}
            {/* <div className="canvas1 relative">
                
            </div> */}
            {/* <div className="sc-1sopgzw-1 cAWijL">
                <div className="sc-1sopgzw-0 inSzCt imageLoadMarker"></div>
                <div className="sc-yu617r-0 Ymtsx" height={"600vh"}>
                    <div className="sc-yu617r-2 frgvIX">
                        <div className="sc-yu617r-1 heKDan" height={"550vh"}></div>
                        <div className="sc-yu617r-3 hLGQiM">
                            <ScrollCanvas />
                        </div>
                    </div>
                </div>
            </div> */}
            <ScrollCanvas frameCount={149} imagePath="/assets/fallback/unbilled-" />
            <SingleCard />
            <CardsSteps />
        </div>
    );
}
