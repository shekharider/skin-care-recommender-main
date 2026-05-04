import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../Styles/Features.css";

const SkinConcernPrediction = () => {
    return (
        <div className="features-page concern-page">
            <div className="features-topbar">
                <Link to="/features" className="features-back" aria-label="Back to features">
                    <IoMdArrowRoundBack />
                </Link>
                <span>SKINCARE</span>
            </div>

            <main className="concern-content">
                <h1>Welcome</h1>
                <p>Diagnose your concerns here.</p>
            </main>
        </div>
    );
};

export default SkinConcernPrediction;
