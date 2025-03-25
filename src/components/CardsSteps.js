import React from "react";

export default function CardsSteps() {
    return (
        <div className="">
            <div className="container">
                <h1 class="sc-g6c3md-4 sc-g6c3md-8 sc-1ehwxu-1 fquCfu dYlzCk czXzVu">
                    every touch is <br /> pure power.
                </h1>
                <div class="sc-g6c3md-0 hrudQH"></div>
                <div className="sc-1ehwxu-2 hHnUWF">
                    {/* Card Step 1 */}
                    <div className="cards_steps card1">
                        <video autoPlay muted poster="https://web-images.credcdn.in/v2/_next/assets/images/cards/desktop/interactions/swipe-fallback.jpg?tr=orig" class="sc-1ehwxu-3 edROEC" loop="">
                            <source src="https://web-images.credcdn.in/v2/_next/assets/videos/cards/desktop/interactions/swipe.mp4?tr=q-95" type="video/mp4" />
                        </video>
                        <div class="sc-g6c3md-0 hdDaEA"></div>
                        <div class="sc-1ehwxu-5 hpTdVv">
                            <img src="https://web-images.credcdn.in/v2/_next/assets/images/cards/swipe-left.png?tr=orig" class="sc-1ehwxu-6 fBRsjM" />
                            <div class="sc-1ehwxu-7 lbxDUD">
                                <p class="sc-g6c3md-9 kkVKoh">
                                    SWIPE LEFT
                                    <span class="sc-g6c3md-10 buBswu">on any card to manage payment history, card offers, and more.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card Step 2 */}
                    <div className="cards_steps card2">
                        <video
                            autoPlay
                            muted
                            poster="https://web-images.credcdn.in/v2/_next/assets/images/cards/desktop/interactions/long-press-fallback.jpg?tr=orig"
                            class="sc-1ehwxu-3 edROEC"
                            loop=""
                        >
                            <source src="https://web-images.credcdn.in/v2/_next/assets/videos/cards/desktop/interactions/long-press.mp4?tr=q-95" type="video/mp4" />
                        </video>
                        <div class="sc-g6c3md-0 hdDaEA"></div>
                        <div class="sc-1ehwxu-5 hpTdVv">
                            <img src="https://web-images.credcdn.in/v2/_next/assets/images/cards/tap-hold.png?tr=orig" class="sc-1ehwxu-6 fBRsjM" />
                            <div class="sc-1ehwxu-7 lbxDUD">
                                <p class="sc-g6c3md-9 kkVKoh">
                                    PRESS AND HOLD
                                    <span class="sc-g6c3md-10 buBswu">a card to view balances, usage limits, recent activity and other key details.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card Step 3 */}
                    <div className="cards_steps card3">
                        <video
                            autoPlay
                            muted
                            poster="https://web-images.credcdn.in/v2/_next/assets/images/cards/desktop/interactions/smart-nav-fallback.jpg?tr=orig"
                            class="sc-1ehwxu-3 edROEC"
                            loop=""
                        >
                            <source src="https://web-images.credcdn.in/v2/_next/assets/videos/cards/desktop/interactions/smart-nav.mp4?tr=q-95" type="video/mp4" />
                        </video>
                        <div class="sc-g6c3md-0 hdDaEA"></div>
                        <div class="sc-1ehwxu-5 hpTdVv">
                            <img src="https://web-images.credcdn.in/v2/_next/assets/images/cards/smart-nav.png?tr=orig" class="sc-1ehwxu-6 fBRsjM" />
                            <div class="sc-1ehwxu-7 lbxDUD">
                                <p class="sc-g6c3md-9 kkVKoh">
                                    SMART NAVIGATION <span class="sc-g6c3md-10 buBswu">makes switching between cards seamless</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
