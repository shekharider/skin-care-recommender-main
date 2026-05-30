import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../Styles/Features.css";

const Features = () => {
    return (
        <div className="features-page">
            <div className="features-topbar">
                <Link to="/" className="features-back" aria-label="Back to home">
                    <IoMdArrowRoundBack />
                </Link>
                <span>SKINCARE</span>
            </div>

            <main className="features-content">
                <section className="features-intro">
                    <p>Choose what you want to do today.</p>
                    <h1>Your skincare assistant</h1>
                </section>

                <div className="features-actions">
                    <Link className="feature-button recommendation" to="/form">
                        Skincare Product Recommendation
                    </Link>
                    <Link className="feature-button chat" to="/chat">
                        Chat
                    </Link>
                    <Link className="feature-button prediction" to="/skin-concern-prediction">
                        Predict Skin Concern
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Features;
