import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Formpage from "../components/Formpage";
import Results from "../components/Results";
import Profile from "../components/Profile";
import CartPage from "../components/CartPage";
import ChatPage from "../components/ChatPage";
import Features from "../components/Features";
import SkinConcernPrediction from "../components/SkinConcernPrediction";

export default function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/form" element={<Formpage />} />
                    <Route path="/recommendation" element={<Formpage />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/skin-concern-prediction" element={<SkinConcernPrediction />} />
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}
