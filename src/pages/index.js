import HeroSec from "../components/HeroSec";
import MultiCard from "../components/MultiCard";
// import ScrollPlaySection from "../components/CanvasSec";
import ScrollCanvas from "../components/ScrollCanvas";
import SingleCard from "../components/SingleCard";
import CardsSteps from "../components/CardsSteps";
import MobileFlip from "../components/MobileFlip";
import MobileFlipMob from "../components/MobileFlipMob";
import Perk from "../components/Perk";
import DataProtect from "../components/DataProtect";
import DownloadCred from "../components/DownloadCred";

export default function Home() {
    return (
        <div>
            <HeroSec />
            <MultiCard />
            <ScrollCanvas />
            <SingleCard />
            <CardsSteps />
            <div className="flip_web">
                <MobileFlip />
            </div>
            <div className="flip_mob">
                <MobileFlipMob />
            </div>
            <Perk />
            <DataProtect />
            <DownloadCred />
        </div>
    );
}
