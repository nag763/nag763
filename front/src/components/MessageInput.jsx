// src/components/MessageInput.jsx
import React, { useState, useEffect, useRef } from 'react'; // Added useRef and useEffect
import { PaperClipIcon, MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';


const MessageInput = ({ onSendMessage, isSending }) => { // Added isSending prop
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isSending) { // Check !isSending
      onSendMessage(inputValue, 'user');
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isSending ? "Waiting for response..." : "Type a Message..."}
          className="flex-grow px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-70"
          disabled={isSending} // Disable input
          maxLength={250} // Set max length to 250 characters
        />
        <div className="text-sm text-gray-500 dark:text-gray-400 pr-2">
          {inputValue.length}/250
        </div>
        <button type="submit" className="hidden" disabled={isSending}></button>
      </div>
    </form>
  );
};

export default MessageInput;