// src/components/MessageList.jsx
import Message from './Message'; // Assuming Message is in a separate file or defined above
import { useRef, useEffect } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-white dark:bg-black">
      {messages.filter((msg) => msg.showInMessages).map((msg) => ( // msg will have an id now
        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Message
            text={msg.text}
            sender={msg.sender}
            isBot={msg.sender === 'bot'}
            isHtml={msg.isHtml || false}
            isTypingIndicator={msg.isTypingIndicator || false} // Pass the flag
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