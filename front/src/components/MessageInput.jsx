// src/components/MessageInput.jsx
import React, { useState, useEffect, useRef } from 'react'; // Added useRef and useEffect
import { PaperClipIcon, MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';


const MessageInput = ({ onSendMessage, isSending }) => { // Added isSending prop
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null); // Ref for focusing

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isSending) { // Check !isSending
      onSendMessage(inputValue, 'user');
      setInputValue('');
    }
  };

  // Optional: Focus input when not sending (e.g., after a message is sent)
  useEffect(() => {
    if (!isSending && inputRef.current) {
      inputRef.current.focus(); // Be cautious with auto-focusing, can be disruptive
    }
  }, [isSending]);


  return (
    <form onSubmit={handleSubmit} className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
          disabled={isSending} // Disable button
        >
          <PaperClipIcon className="h-5 w-5" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isSending ? "Waiting for response..." : "Type a Message..."}
          className="flex-grow px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-70"
          disabled={isSending} // Disable input
        />
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
          disabled={isSending} // Disable button
        >
          <MicrophoneIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
          disabled={isSending} // Disable button
        >
          <VideoCameraIcon className="h-5 w-5" />
        </button>
        <button type="submit" className="hidden" disabled={isSending}></button>
      </div>
    </form>
  );
};

export default MessageInput;