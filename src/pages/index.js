import HeroSec from "../components/HeroSec";
import MultiCard from "../components/MultiCard";
// import ScrollPlaySection from "../components/CanvasSec";
import ScrollCanvas from "../components/ScrollCanvas";
import SingleCard from "../components/SingleCard";
import CardsSteps from "../components/CardsSteps";
import MobileFlip from "../components/MobileFlip";
import Perk from "../components/Perk";

export default function Home() {
    return (
        <div>
            <HeroSec />
            <MultiCard />
            <ScrollCanvas />
            <SingleCard />
            <CardsSteps />
            <MobileFlip />
            <Perk />
        </div>
    );
}
