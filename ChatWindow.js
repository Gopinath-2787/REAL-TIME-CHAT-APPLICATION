import React, { useState, useEffect } from 'react';
import MessageBubble from './MessageBubbles.js';
import MessageInput from './MessageInputs.js';

const ChatWindow = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let botText = '';

      if (["hi", "hello", "hey", "hii"].some(greet => lower.includes(greet))) {
        botText = "👋 Hello! I'm your smart assistant. You can ask about time, date, weather, or news!";
      } else if (lower.includes("time")) {
        botText = `🕒 Current time is: ${new Date().toLocaleTimeString()}`;
      } else if (lower.includes("date") || lower.includes("day")) {
        botText = `📅 Today's date is: ${new Date().toLocaleDateString()}`;
      } else if (lower.includes("weather")) {
        botText = "🌤️ Weather update: Sunny, 33°C with a light breeze. (Simulated)";
      } else if (lower.includes("news")) {
        botText = "📰 Top Headline: 'India launches AI-powered learning for all students!' (Simulated)";
      } else if (lower.includes("help")) {
        botText = "🧠 I can help you with: time, date, weather, news. Try asking!";
      } else if (lower.includes("bye")) {
        botText = "👋 Goodbye! Take care.";
      } else if (lower.includes("joke")) {
        botText = "😂 Why don't scientists trust atoms? Because they make up everything!";
      }
       else {
        botText = "🤔 Sorry, I didn't understand. You can ask about: time, date, weather, or news.";
      }

      const botReply = { text: botText, sender: 'bot' };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  // ✅ New: Clear Chat Function
  const clearChat = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  return (
    <div className="chat-window">
      <div className="message-area">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg.text} sender={msg.sender} />
        ))}
      </div>

      {/* ✅ Clear Chat Button */}
      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <button onClick={clearChat} style={{ padding: '8px 16px', borderRadius: '6px', background: '#800080', color: '#fff', border: 'none' }}>
          🧹 Clear Chats
        </button>
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;
