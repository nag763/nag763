import React, { useState, useEffect, useRef } from 'react';
import {
  PaperClipIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  SparklesIcon,
  ArrowLeftIcon // For the "Go back" button
} from '@heroicons/react/24/outline';

const Header = ({ toggleTheme, theme }) => {
  // This header no longer needs to manage padding for the "Go back" button if it's outside
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="p-2 bg-white dark:bg-gray-700 rounded-full mr-3">
          <SparklesIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
          Hello 👋! I'm here to help... CV. What would you like to know?
        </p>
      </div>
    </div>
  );
};

const Message = ({ text, sender, isBot }) => {
  const bgColor = isBot ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-500 dark:bg-blue-600';
  const textColor = isBot ? 'text-gray-800 dark:text-gray-200' : 'text-white';
  const alignment = isBot ? 'self-start' : 'self-end';
  const borderRadius = isBot
    ? 'rounded-r-lg rounded-bl-lg'
    : 'rounded-l-lg rounded-br-lg';

  return (
    <div className={`max-w-[80%] sm:max-w-[70%] p-3 my-1 ${alignment} ${bgColor} ${textColor} ${borderRadius} shadow-sm break-words`}>
      {text}
    </div>
  );
};

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-white dark:bg-black">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <Message text={msg.text} sender={msg.sender} isBot={msg.sender === 'bot'} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const MessageInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue, 'user');
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <PaperClipIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a Message..."
          className="flex-grow px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <VideoCameraIcon className="h-5 w-5" />
        </button>
        <button type="submit" className="hidden"></button>
      </div>
    </form>
  );
};


// Main ChatInterface Component
export default function ChatInterface({ theme, toggleTheme }) {
  const [messages, setMessages] = useState([
    // Initial messages if any
  ]);

  // ... (addUserMessage, addBotMessage, simulateBotResponse, handleSendMessage functions remain the same)
  const addUserMessage = (text) => {
    setMessages(prevMessages => [...prevMessages, { text, sender: 'user' }]);
    // simulateBotResponse(text); // Trigger bot response
  };

  const addBotMessage = (text) => {
    setMessages(prevMessages => [...prevMessages, { text, sender: 'bot' }]);
  };

  const simulateBotResponse = (userMessage) => {
    setTimeout(() => {
      addBotMessage(`Bot received: "${userMessage}". I'm thinking...`);
      setTimeout(() => {
        addBotMessage("Here's some information about Loïc's CV...");
      }, 1500);
    }, 1000);
  };

  const handleSendMessage = (text, sender) => {
    if (sender === 'user') {
      addUserMessage(text);
      simulateBotResponse(text);
    } else {
      addBotMessage(text);
    }
  };

  useEffect(() => {
    if (messages.length === 0 && !localStorage.getItem('initialBotMessageSent')) {
      // The Header already displays a greeting.
      // You might still want an initial message in the chat flow.
      // addBotMessage("Welcome! Ask me anything about Loïc's CV.");
      // localStorage.setItem('initialBotMessageSent', 'true'); // Prevent re-adding on HMR
    }
  }, []);

  return (
    // Main container for the full screen chat
    <div className="flex flex-col h-screen w-screen bg-gray-100 dark:bg-gray-950">
      {/* "Go back" button container */}
      <div className="p-2 sm:p-3 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <a
          href="/" // Change this to your main page's path
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Go back to main page
        </a>
      </div>

      {/* Existing Header for bot info and theme toggle */}
      <Header toggleTheme={toggleTheme} theme={theme} />

      {/* Message List takes up remaining space */}
      <MessageList messages={messages} />

      {/* Message Input at the bottom */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}