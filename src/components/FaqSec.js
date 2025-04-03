import React from "react";

export default function FaqSec() {
    return (
        <div className="faqs_main">
            <div className="faq_fi">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                FREQUENTLY ASKED QUESTIONS
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="sc-1w5gd28-6 ekFkoD">how can I add my cards on CRED?</div>
                                <div class="sc-1w5gd28-7 ccXGfa">
                                    CRED automatically detects credit cards linked to your account. if your cards are not detected, just tap the 'credit cards' icon, click 'add a card', fill in the
                                    details, and you're good to go.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
