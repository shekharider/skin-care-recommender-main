import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../Styles/Formpage.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const ChatPage = () => {
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState([
        {
            from: "bot",
            text: "Hello! Ask me anything about skincare routines, products, or skin concerns.",
        },
    ]);
    const [isSending, setIsSending] = useState(false);
    const chatWindowRef = useRef(null);

    const handleChatSubmit = async (e) => {
        e.preventDefault();

        const trimmedMessage = chatInput.trim();
        if (!trimmedMessage || isSending) return;

        const userMessage = { from: "user", text: trimmedMessage };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput("");
        setIsSending(true);

        try {
            const history = chatMessages
                .map((message) => ({
                    role: message.from === "user" ? "user" : "assistant",
                    content: message.text,
                }))
                .slice(-10);

            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: trimmedMessage,
                    history,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Chat request failed");
            }

            setChatMessages(prev => [...prev, { from: "bot", text: data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setChatMessages(prev => [
                ...prev,
                {
                    from: "bot",
                    text: "Sorry, I couldn't reach the skincare assistant. Please try again later.",
                },
            ]);
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="form-image-container chat-page">
            <div className="blue-box">
                <Link to="/form">
                    <div className="backarrow">
                        <IoMdArrowRoundBack style={{ width: 30, height: 30, marginLeft: 10, marginTop: 10 }} />
                    </div>
                </Link>
            </div>

            <div className="chat-page-container">
                <div className="chatbot-container chat-page-panel">
                    <div className="chatbot-header">
                        <div>
                            <h4>Skincare AI Chat</h4>
                            <p>Ask simple questions about skin routines, products, ingredients, and everyday skin concerns.</p>
                        </div>
                    </div>

                    <div className="chat-window chat-page-window" ref={chatWindowRef}>
                        {chatMessages.map((message, idx) => (
                            <div key={idx} className={`chat-message ${message.from}`}>
                                <span>{message.text}</span>
                            </div>
                        ))}
                    </div>

                    <form className="chat-input-form" onSubmit={handleChatSubmit}>
                        <input
                            type="text"
                            placeholder="Ask something like: Best moisturizer for oily skin"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            disabled={isSending}
                        />
                        <button className="chat-send-button" type="submit" disabled={isSending}>
                            {isSending ? "..." : "Ask"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
