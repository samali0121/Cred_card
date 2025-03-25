import HeroSec from "../components/HeroSec";
import MultiCard from "../components/MultiCard";
// import ScrollPlaySection from "../components/CanvasSec";
import SingleCard from "../components/SingleCard";
import CardsSteps from "../components/CardsSteps";
export default function Home() {
    return (
        <div>
            <HeroSec />
            <MultiCard />
            {/* <ScrollPlaySection/> */}
            <SingleCard />
            <CardsSteps />
        </div>
    );
}
