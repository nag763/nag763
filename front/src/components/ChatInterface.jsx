import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MoonIcon, SunIcon, UserCircleIcon, SparklesIcon, ArrowLeftIcon
} from '@heroicons/react/24/outline'; // Removed unused icons for brevity
import { marked } from 'marked';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

const agentApi = import.meta.env.PUBLIC_AGENT_ENDPOINT;

const Header = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="p-2 bg-white dark:bg-gray-700 rounded-full mr-3">
          <SparklesIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Hello 👋! I'm here to help you with information about Loïc's CV. What would you like to know?
        </p>
      </div>
    </div>
  );
};


export default function ChatInterface({ theme, toggleTheme }) {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!agentApi) {
      console.error("Agent API endpoint is not configured.");
      addBotMessage("Error: Chat service is not configured.", false, false, crypto.randomUUID());
    }
  }, []);

  const addUserMessage = useCallback((text) => {
    const newMessage = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
      isHtml: false,
      isTypingIndicator: false,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  // Modified addBotMessage to include id directly
  const addBotMessage = useCallback((text, isHtmlContent = false, isTyping = false, id = crypto.randomUUID()) => {
    const newMessage = {
      id, // Use provided id or generate new
      text,
      sender: 'bot',
      isHtml: isHtmlContent,
      isTypingIndicator: isTyping,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return id; // Return the ID
  }, []);


  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    addUserMessage(messageText);
    setIsSending(true);

    const typingIndicatorId = crypto.randomUUID(); // Generate ID for typing indicator
    addBotMessage("Bot is typing", false, true, typingIndicatorId); // Add typing indicator with its ID

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: messageText
      }),
    };

    try {
      const response = await fetch(agentApi, options);
      // Remove typing indicator REGARDLESS of response success, before adding new message
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicatorId));

      if (!response.ok) {
        let errorText = `API error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorData.detail || errorData.error || errorText;
        } catch (e) { 
          try {
            errorText = await response.text()
          } catch (e2) {
            // ignore
          }
        }
        throw new Error(errorText);
      }
      const botText = await response.text();

      if (botText) {
        const parsedHtml = marked.parse(botText);
        addBotMessage(parsedHtml, true);
      } else {
        addBotMessage("Received an empty response from the assistant.", false);
      }
    } catch (err) {
      // Ensure typing indicator is removed if not already
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicatorId && msg.id !== undefined));
      console.error("Error sending message:", err);
      addBotMessage(`An error occurred: ${err.message || "Please try again."}`, false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 dark:bg-gray-950">
      <div className="p-2 sm:p-3 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <a
          href="/"
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Go back to main page
        </a>
      </div>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isSending={isSending} />
    </div>
  );
}