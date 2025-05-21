// src/components/MessageList.jsx
import Message from './Message'; // Assuming Message is in a separate file or defined above
import { useRef, useEffect } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null); // Ensure useRef is imported from 'react'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]); // Ensure useEffect is imported from 'react'

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-white dark:bg-black">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Message
            text={msg.text}
            sender={msg.sender}
            isBot={msg.sender === 'bot'}
            isHtml={msg.isHtml || false} // Pass the isHtml flag
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

// If MessageList is in the same file as ChatInterface, make sure imports are at the top.
// If it's separate, export default MessageList;
export default MessageList;