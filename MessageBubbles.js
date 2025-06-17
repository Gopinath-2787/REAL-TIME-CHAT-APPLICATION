import React from 'react';

const MessageBubble = ({ message, sender }) => {
  const isUser = sender === 'user';

  return (
    <div
      className="message-bubble"
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#DCF8C6' : '#E8E8E8',
        padding: '10px',
        borderRadius: '15px',
        margin: '5px',
        maxWidth: '60%',
      }}
    >
      {message}
    </div>
  );
};

export default MessageBubble;
