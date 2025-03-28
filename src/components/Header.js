import { useState, useRef, useEffect } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("whats-new"); // Set first tab as default
    const [clickedTab, setClickedTab] = useState("whats-new"); // Set first tab as default
    const [isTransitioning, setIsTransitioning] = useState(false);
    const menuRef = useRef(null);
    const leaveTimer = useRef(null);

    // Clear timer on unmount
    useEffect(() => {
        return () => {
            if (leaveTimer.current) {
                clearTimeout(leaveTimer.current);
            }
        };
    }, []);

    const handleMouseEnter = (tab) => {
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
        setActiveTab(tab);
        setIsTransitioning(false);
    };

    const handleMouseLeave = () => {
        // Only add delay if not clicking
        if (!clickedTab) {
            leaveTimer.current = setTimeout(() => {
                if (!clickedTab) {
                    setActiveTab(null);
                }
                setIsTransitioning(false);
            }, 200); // 200ms delay
            setIsTransitioning(true);
        }
    };

    const handleClick = (tab) => {
        if (clickedTab === tab) {
            // Don't do anything if clicking the already clicked tab
            return;
        }
        setClickedTab(tab);
        setActiveTab(tab);
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
    };

    // Add buffer zone detection
    const handleMenuMouseEnter = () => {
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
    };

    return (
        <div className="header_mian">
            <div id="navbar-wrapper" className="sc-1tidt5-2 eojfPz">
                <div className="kBIxEK">
                    <span className="web-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="74" height="88" viewBox="0 0 74 88" fill="none">
                            <path
                                d="M36.9957 57.4618C36.6778 57.4628 36.3652 57.3812 36.0889 57.225L12.5222 44.0271C12.2371 43.8671 11.9999 43.6345 11.835 43.3533C11.6701 43.072 11.5834 42.7521 11.5839 42.4266V1.83446C11.5839 1.34793 11.7783 0.88133 12.1243 0.537302C12.4703 0.193273 12.9396 0 13.429 0H60.5595C61.0489 0 61.5182 0.193273 61.8642 0.537302C62.2102 0.88133 62.4046 1.34793 62.4046 1.83446V42.4266C62.4051 42.7521 62.3184 43.072 62.1535 43.3533C61.9887 43.6345 61.7514 43.8671 61.4663 44.0271L37.8996 57.225C37.6242 57.3808 37.3126 57.4624 36.9957 57.4618ZM15.274 41.3681L36.9957 53.5332L58.7145 41.3681V3.66892H15.274V41.3681Z"
                                fill="white"
                            ></path>
                            <path
                                d="M36.9957 39.0858C36.678 39.0854 36.3658 39.0038 36.0889 38.849L28.6284 34.6665C28.3433 34.5069 28.106 34.2749 27.9406 33.9942C27.7752 33.7135 27.6878 33.3941 27.6872 33.0688V25.3915H31.3773V32.0132L36.9986 35.1515L43.5552 31.4769L45.3658 34.6722L37.9053 38.8547C37.6271 39.0081 37.3138 39.0877 36.9957 39.0858Z"
                                fill="white"
                            ></path>
                            <path
                                d="M36.9957 48.2752C36.678 48.2748 36.3658 48.1933 36.0889 48.0384L20.5739 39.3482C20.2891 39.1885 20.0522 38.9563 19.8873 38.6756C19.7225 38.3949 19.6356 38.0756 19.6356 37.7506V17.8425C19.6356 17.356 19.83 16.8894 20.176 16.5453C20.522 16.2013 20.9913 16.008 21.4806 16.008H44.2668V19.6855H23.3199V36.6864L36.99 44.3438L50.6571 36.6864V28.7323H54.3472V37.7506C54.3472 38.0756 54.2603 38.3949 54.0954 38.6756C53.9306 38.9563 53.6936 39.1885 53.4089 39.3482L37.8938 48.0384C37.6196 48.192 37.3104 48.2735 36.9957 48.2752Z"
                                fill="white"
                            ></path>
                            <path
                                d="M54.3529 21.7197H50.6628V11.6744H26.1664V8.00545H52.5108C53.0001 8.00545 53.4694 8.19872 53.8154 8.54275C54.1614 8.88678 54.3558 9.35338 54.3558 9.83991L54.3529 21.7197Z"
                                fill="white"
                            ></path>
                            <path
                                d="M0 78.5624C0 73.2244 3.97991 69.1304 9.46915 69.1304C11.0224 69.1067 12.5559 69.4796 13.9228 70.2134C15.2898 70.9471 16.4446 72.0173 17.2769 73.3214L13.6872 75.4013C12.8809 74.0005 11.3199 73.1731 9.47202 73.1731C6.2439 73.1731 4.16356 75.3242 4.16356 78.5624C4.16356 81.8005 6.2439 83.9516 9.47202 83.9516C11.3199 83.9516 12.9153 83.1243 13.6872 81.7235L17.2769 83.7976C15.7159 86.3652 12.8034 87.9943 9.47202 87.9943C3.97991 87.9943 0 83.9003 0 78.5624Z"
                                fill="white"
                            ></path>
                            <path d="M53.1248 83.9174V87.9515H40.8264V69.1219H53.1248V73.156H45.1478V76.3827H52.1693V80.4681H45.1478V83.9088L53.1248 83.9174Z" fill="white"></path>
                            <path
                                d="M32.5997 81.0673C33.63 80.5632 34.5007 79.7866 35.1162 78.8229C35.7317 77.8591 36.0683 76.7453 36.0889 75.6038C36.092 74.7546 35.9262 73.9131 35.601 73.1278C35.2759 72.3425 34.7979 71.6288 34.1945 71.0278C33.591 70.4268 32.8741 69.9502 32.0848 69.6256C31.2956 69.301 30.4495 69.1346 29.5954 69.1361H22.0201V88H26.3472V81.7948H28.4075L31.9799 87.9943H36.6341L32.5997 81.0673ZM29.5954 78.0231H26.3472V73.1731H29.5954C30.7862 73.1731 31.759 74.223 31.759 75.5981C31.759 76.9733 30.7862 78.0231 29.5954 78.0231Z"
                                fill="white"
                            ></path>
                            <path
                                d="M64.8178 69.1304H57.8594V87.9315H64.8178C70.0229 87.9315 86.8605 83.8489 86.8605 78.531C86.8605 73.213 70.0143 69.1304 64.8178 69.1304ZM64.8178 83.9174H62.175V73.1674H64.8063C67.7733 73.1674 69.8221 75.31 69.8221 78.5338C69.8221 81.7577 67.7848 83.9174 64.8178 83.9174Z"
                                fill="white"
                            ></path>
                        </svg>
                    </span>
                    <span className="mob-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="92" height="44" viewBox="0 0 92 44" fill="none">
                            <path
                                d="M18.4129 34.1987C18.2797 34.1997 18.1488 34.1647 18.0339 34.0975L8.15421 28.5378C8.03534 28.4693 7.93653 28.371 7.86766 28.2526C7.79879 28.1342 7.76226 27.9999 7.76172 27.863V10.7588C7.76172 10.553 7.84372 10.3557 7.98967 10.2102C8.13561 10.0647 8.33354 9.98291 8.53993 9.98291H28.34C28.5453 9.98469 28.7415 10.0672 28.8859 10.2125C29.0304 10.3579 29.1115 10.5542 29.1114 10.7588V27.863C29.1109 27.9999 29.0744 28.1342 29.0055 28.2526C28.9366 28.371 28.8379 28.4693 28.719 28.5378L18.8189 34.0975C18.7037 34.1638 18.573 34.1987 18.44 34.1987H18.4129ZM9.31138 27.411L18.44 32.5389L27.5618 27.411V11.5348H9.29106L9.31138 27.411Z"
                                fill="white"
                            ></path>
                            <path
                                d="M18.4129 26.4529C18.2808 26.4529 18.1506 26.4205 18.034 26.3584L14.9212 24.5907C14.8009 24.5239 14.701 24.4259 14.6319 24.3071C14.5628 24.1884 14.5271 24.0532 14.5287 23.916V20.6773H16.0784V23.4706L18.44 24.8201L21.1942 23.275L21.9521 24.6244L18.819 26.3922C18.7021 26.4534 18.5721 26.4858 18.44 26.4866"
                                fill="white"
                            ></path>
                            <path
                                d="M18.4129 30.3259C18.2797 30.3268 18.1487 30.2919 18.0339 30.2246L11.5377 26.5676C11.4188 26.4992 11.32 26.4009 11.2511 26.2825C11.1822 26.1641 11.1457 26.0298 11.1452 25.8929V17.5061C11.1443 17.404 11.1638 17.3027 11.2026 17.2081C11.2414 17.1136 11.2986 17.0277 11.3711 16.9555C11.4435 16.8832 11.5297 16.8261 11.6245 16.7874C11.7193 16.7488 11.8209 16.7293 11.9234 16.7302H21.4919V18.2753H12.6948V25.4409L18.44 28.666L24.1851 25.4409V22.0673H25.7347V25.8659C25.7328 26.0033 25.695 26.1378 25.625 26.2562C25.5549 26.3745 25.4552 26.4726 25.3355 26.5407L18.8189 30.1977C18.7037 30.264 18.573 30.2989 18.44 30.2989"
                                fill="white"
                            ></path>
                            <path
                                d="M25.7077 19.1388H24.1581V14.9016H13.8656V13.3565H24.9295C25.1353 13.3582 25.3323 13.4406 25.4778 13.5857C25.6234 13.7308 25.7059 13.9272 25.7077 14.1324V19.1388Z"
                                fill="white"
                            ></path>
                            <path
                                d="M43.9106 27.1006C42.1733 27.1006 40.5072 26.4125 39.2788 25.1876C38.0503 23.9628 37.3602 22.3015 37.3602 20.5693C37.3602 18.8371 38.0503 17.1758 39.2788 15.951C40.5072 14.7261 42.1733 14.038 43.9106 14.038C44.9976 14.0265 46.0687 14.2981 47.0182 14.8258C47.9676 15.3536 48.7624 16.1193 49.3242 17.0472L49.3851 17.1484L47.4024 18.2955L47.3482 18.1875C47.0011 17.5833 46.4963 17.0842 45.8874 16.7432C45.2786 16.4022 44.5884 16.2321 43.8903 16.2511C42.7417 16.2511 41.6401 16.706 40.8279 17.5158C40.0157 18.3257 39.5595 19.424 39.5595 20.5693C39.5595 21.7145 40.0157 22.8129 40.8279 23.6227C41.6401 24.4326 42.7417 24.8875 43.8903 24.8875C44.5893 24.9116 45.2815 24.7438 45.8913 24.4023C46.5011 24.0608 47.0051 23.5588 47.3482 22.9511L47.4024 22.8431L49.3851 23.9699L49.3242 24.0711C48.7686 25.006 47.9756 25.7784 47.0252 26.3103C46.0747 26.8422 45.0004 27.1148 43.9106 27.1006Z"
                                fill="white"
                            ></path>
                            <path
                                d="M37.4279 20.5693C37.411 19.7183 37.5676 18.8729 37.8882 18.084C38.2087 17.2952 38.6865 16.5795 39.2926 15.9802C39.8987 15.3809 40.6205 14.9105 41.4143 14.5975C42.2081 14.2846 43.0573 14.1355 43.9106 14.1594C44.9809 14.1403 46.0373 14.4028 46.9735 14.9204C47.9097 15.4381 48.6924 16.1926 49.2429 17.108L47.47 18.1335C47.1178 17.505 46.6001 16.9842 45.9728 16.6275C45.3456 16.2708 44.6325 16.0916 43.9106 16.1094C42.7314 16.1094 41.6006 16.5764 40.7669 17.4078C39.9331 18.2391 39.4647 19.3666 39.4647 20.5423C39.4647 21.718 39.9331 22.8455 40.7669 23.6769C41.6006 24.5082 42.7314 24.9752 43.9106 24.9752C44.633 24.996 45.3473 24.8181 45.9751 24.4611C46.6029 24.104 47.1201 23.5816 47.47 22.9511L49.2429 23.9631C48.6941 24.881 47.9121 25.6382 46.9758 26.1583C46.0395 26.6784 44.9822 26.9429 43.9106 26.9252C43.0573 26.9491 42.2081 26.8 41.4143 26.4871C40.6205 26.1741 39.8987 25.7037 39.2926 25.1044C38.6865 24.5051 38.2087 23.7894 37.8882 23.0006C37.5676 22.2117 37.411 21.3663 37.4279 20.5153"
                                fill="white"
                            ></path>
                            <path
                                d="M59.5219 26.8712L56.8964 22.364H54.6768V26.8712H52.3896V14.2674H57.4648C58.5542 14.2674 59.5989 14.6988 60.3693 15.4669C61.1396 16.235 61.5724 17.2767 61.5724 18.3629C61.5618 19.1362 61.3293 19.8903 60.9023 20.536C60.4754 21.1817 59.872 21.692 59.1633 22.0064L62.0122 26.8712H59.5219ZM57.4919 20.3129C57.9939 20.2953 58.4685 20.0803 58.8121 19.715C59.1557 19.3496 59.3403 18.8636 59.3257 18.3629C59.3366 18.1141 59.2975 17.8657 59.2107 17.6322C59.1239 17.3986 58.9912 17.1848 58.8204 17.0031C58.6496 16.8215 58.444 16.6757 58.2159 16.5743C57.9877 16.473 57.7416 16.4181 57.4919 16.413H54.6904V20.3129H57.4919Z"
                                fill="white"
                            ></path>
                            <path
                                d="M56.9641 22.2292H54.555V26.7296H52.5249V14.3889H57.4851C58.0093 14.3862 58.5288 14.4872 59.0136 14.6859C59.4983 14.8847 59.9388 15.1773 60.3095 15.5469C60.6801 15.9165 60.9736 16.3556 61.1729 16.839C61.3723 17.3224 61.4735 17.8404 61.4708 18.363C61.4634 19.1357 61.226 19.8887 60.7886 20.5266C60.3513 21.1644 59.7338 21.6584 59.0144 21.9458L61.8295 26.7498H59.5964L56.9641 22.2292ZM54.555 20.4074H57.4784C58.0079 20.3772 58.5059 20.1462 58.8701 19.7617C59.2343 19.3772 59.4373 18.8683 59.4373 18.3394C59.4373 17.8105 59.2343 17.3016 58.8701 16.9171C58.5059 16.5326 58.0079 16.3015 57.4784 16.2714H54.555V20.4074Z"
                                fill="white"
                            ></path>
                            <path d="M64.8543 26.8712V14.2741H72.5281V16.4535H67.128V19.429H72.0882V21.5881H67.128V24.6918H72.6228V26.8712H64.8543Z" fill="white"></path>
                            <path d="M72.501 24.8133V26.7565H64.9694V14.3888H72.413V16.332H67.0062V19.5505H71.9732V21.4734H67.0062V24.8133H72.501Z" fill="white"></path>
                            <path
                                d="M75.8439 26.8712V14.2674H80.8108C84.262 14.2674 86.8605 16.9662 86.8605 20.5693C86.8814 22.2212 86.269 23.8189 85.1484 25.0359C84.5899 25.6216 83.9168 26.0866 83.1706 26.4023C82.4245 26.718 81.6213 26.8776 80.8108 26.8712H75.8439ZM80.8312 24.6918C83.0981 24.6918 84.6815 22.9983 84.6815 20.5693C84.6815 18.1403 83.0981 16.4467 80.8312 16.4467H78.1244V24.6918H80.8312Z"
                                fill="white"
                            ></path>
                            <path
                                d="M86.7657 20.5693C86.7657 24.0171 84.2484 26.7497 80.8311 26.7497H75.9589V14.3888H80.8311C84.2484 14.3888 86.7657 17.0877 86.7657 20.5693ZM84.7965 20.5693C84.7965 18.1133 83.186 16.332 80.8311 16.332H77.9958V24.8066H80.8108C83.1657 24.8066 84.7762 23.005 84.7762 20.5693"
                                fill="white"
                            ></path>
                        </svg>
                    </span>
                </div>
                <div className="menu-container">
                    {/* Hamburger/X Button */}
                    <div className={`menu-button ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {/* Menu List */}
                    <nav className={`menu ${isOpen ? "show" : ""}`}>
                        {/* Web Menu */}
                        <div className="web-menu">
                            <div className="sc-lzqbdr-1 ifdFUg">
                                {/* Tabs */}
                                <div className="sc-lzqbdr-2 fnLXEk tabs">
                                    <div
                                        className={`sc-lzqbdr-3 cELZbo whts menu-hover ${activeTab === "whats-new" ? "active" : ""}`}
                                        onMouseEnter={() => handleMouseEnter("whats-new")}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick("whats-new")}
                                    >
                                        <div className="sc-lzqbdr-4 fkxYSv menu-text">what's new</div>
                                    </div>
                                    <div
                                        className={`sc-lzqbdr-3 cELZbo menu-hover ${activeTab === "payments" ? "active" : ""}`}
                                        onMouseEnter={() => handleMouseEnter("payments")}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick("payments")}
                                    >
                                        <div className="sc-lzqbdr-4 fkxYSv fLtiWE menu-text">payments</div>
                                    </div>
                                    <div
                                        className={`sc-lzqbdr-3 cELZbo menu-hover ${activeTab === "upgrades" ? "active" : ""}`}
                                        onMouseEnter={() => handleMouseEnter("upgrades")}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick("upgrades")}
                                    >
                                        <div className="sc-lzqbdr-4 fkxYSv menu-text">upgrades</div>
                                    </div>
                                    <div
                                        className={`sc-lzqbdr-3 cELZbo menu-hover ${activeTab === "company" ? "active" : ""}`}
                                        onMouseEnter={() => handleMouseEnter("company")}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick("company")}
                                    >
                                        <div className="sc-lzqbdr-4 fkxYSv menu-text">company</div>
                                    </div>
                                    <div
                                        className={`sc-lzqbdr-3 cELZbo menu-hover ${activeTab === "insider-perks" ? "active" : ""}`}
                                        onMouseEnter={() => handleMouseEnter("insider-perks")}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick("insider-perks")}
                                    >
                                        <div className="sc-lzqbdr-4 fkxYSv menu-text">insider perks</div>
                                    </div>
                                </div>
                                <div className="tab-divs">
                                    <div className="tab-mar">
                                        {/* Menu 1 - What's New */}
                                        {activeTab === "whats-new" && (
                                            <div className="sc-lzqbdr-13 fILBYT">
                                                <div className="sc-lzqbdr-14 TYhJo">
                                                    <img src="https://web-images.credcdn.in/v2/_next/assets/images/launch-banners/cards/now-live-wide.png?tr=q-95" className="sc-lzqbdr-15 kvUgOR" />
                                                    <div className="sc-lzqbdr-16 erPHPG">now live</div>
                                                </div>
                                                <div className="sc-lzqbdr-17 fERHzj">
                                                    <div className="sc-lzqbdr-18 dlooAP">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/money-thumbnail.png" className="sc-lzqbdr-19 jWwyTn" />
                                                        <div className="sc-lzqbdr-20 dnZKIO">MONEY</div>
                                                        <div className="sc-lzqbdr-21 foa-Dtc">track, analyze, and reflect on your financial behavior</div>
                                                    </div>
                                                    <div className="sc-lzqbdr-18 dlooAP">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/garage-thumbnail.png" className="sc-lzqbdr-19 jWwyTn" />
                                                        <div className="sc-lzqbdr-20 dnZKIO">garage</div>
                                                        <div className="sc-lzqbdr-21 foa-Dtc">
                                                            manage, maintain, and
                                                            <br />
                                                            obsess over your cars
                                                        </div>
                                                    </div>
                                                    <div className="sc-lzqbdr-18 dlooAP">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/p2p-thumbnail.png" className="sc-lzqbdr-19 jWwyTn" />
                                                        <div className="sc-lzqbdr-20 dnZKIO">pay anyone</div>
                                                        <div className="sc-lzqbdr-21 foa-Dtc">
                                                            pay anyone, no matter
                                                            <br />
                                                            what UPI app they're on
                                                        </div>
                                                    </div>
                                                    <div className="sc-lzqbdr-18 dlooAP">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/careers-thumbnail.png" className="sc-lzqbdr-19 jWwyTn" />
                                                        <div className="sc-lzqbdr-20 dnZKIO">WORK FOR CRED</div>
                                                        <div className="sc-lzqbdr-21 foa-Dtc">
                                                            apply to build the most
                                                            <br />
                                                            trustworthy community
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Menu 2 - Payments */}
                                        {activeTab === "payments" && (
                                            <div className="sc-lzqbdr-10 eJuiXU">
                                                <a href="https://cred.club/tap" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/tnp-logo.png" className="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">Tap to Pay</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/pay-via-upi" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/p2p-logo.png" className="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">Pay Anyone</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/upi-on-credit" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/rupay-logo.png" className="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">RuPay Cards on UPI</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/cred-pay" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/snp-logo.png" className="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">Scan &amp; Pay</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                        {/* Menu 3 - Upgrades */}
                                        {activeTab === "upgrades" && (
                                            <div className="sc-lzqbdr-10 eJuiXU">
                                                <a href="https://cred.club/tap" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/travel-logo.png" class="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">TRAVEL</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/pay-via-upi" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/garage-logo.png" class="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">GARAGE</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/upi-on-credit" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/mint-logo.png" class="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">MINT</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/cred-pay" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <img src="https://web-images.credcdn.in/v2/_next/assets/images/navbar/snp-logo.png" className="sc-lzqbdr-6 jLcmwh" />
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">Scan &amp; MONEY</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                        {/* Menu 4 - Company */}
                                        {activeTab === "company" && (
                                            <div className="sc-lzqbdr-10 eJuiXU">
                                                <a href="https://cred.club/tap" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">ABOUT</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/pay-via-upi" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">CRED</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://cred.club/upi-on-credit" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">CAREERS</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                        {/* Menu 5 - Insider-Perks */}
                                        {activeTab === "insider-perks" && (
                                            <div className="sc-lzqbdr-10 eJuiXU">
                                                <a href="https://cred.club/tap" target="_blank" rel="noreferrer">
                                                    <div className="sc-lzqbdr-5 ioROUa">
                                                        <div className="sc-lzqbdr-7 hgQsWn">
                                                            <div className="sc-lzqbdr-8 hAZRxv">UPGRADS TO UPl</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Menu */}
                        <div className="mob-menu">
                            <MobileMenu />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
