import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  PaperClipIcon, MicrophoneIcon, VideoCameraIcon, MoonIcon, SunIcon, UserCircleIcon, SparklesIcon, ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { marked } from 'marked'; // Import marked

// Import sub-components (assuming they are in separate files)
import MessageList from './MessageList'; // Create MessageList.jsx
import MessageInput from './MessageInput'; // Create MessageInput.jsx

// Get the API endpoint from environment variables
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

// Main ChatInterface Component
export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [userUuid, setUserUuid] = useState('');
  const [sessionUuid, setSessionUuid] = useState('');
  const [isSending, setIsSending] = useState(false); // For disabling input
  const inputRef = useRef(null); // To potentially focus input later

  // Generate UUIDs and create session on mount
  useEffect(() => {
    const newUserId = crypto.randomUUID();
    const newSessionId = crypto.randomUUID();
    setUserUuid(newUserId);
    setSessionUuid(newSessionId);

    async function createSession(userId, sessionId) {
      if (!agentApi) {
        console.error("Agent API endpoint is not configured.");
        addBotMessage("Error: Chat service is not configured.", true); // Add error as bot message
        return;
      }
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Body is not specified in your original createSession, assuming it's not needed
        // or add body: JSON.stringify({ user_id: userId, session_id: sessionId }) if required
      };

      try {
        const response = await fetch(
          `${agentApi}/apps/assistant/users/${userId}/sessions/${sessionId}`,
          options,
        );
        if (!response.ok) {
          throw new Error(`Session creation failed: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Session created:", data);
        // Optionally, add a welcome message from bot after session is created
        // addBotMessage("Session started. How can I help you today?", false);
      } catch (err) {
        console.error("Error creating session:", err);
        addBotMessage("Could not start a chat session. Please try again later.", true);
      }
    }

    createSession(newUserId, newSessionId);
  }, []); // Empty dependency array means this runs once on mount


  const addUserMessage = useCallback((text) => {
    setMessages(prevMessages => [...prevMessages, { text, sender: 'user', isHtml: false }]);
  }, []);

  const addBotMessage = useCallback((text, isHtmlContent = false) => {
    setMessages(prevMessages => [...prevMessages, { text, sender: 'bot', isHtml: isHtmlContent }]);
  }, []);

  // Adapted sendMessage logic
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !userUuid || !sessionUuid) return;

    addUserMessage(messageText); // Display user's message immediately
    setIsSending(true);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_name: "assistant", // Ensure this is correct for your backend
        user_id: userUuid,
        session_id: sessionUuid,
        new_message: {
          role: "user",
          parts: [{ text: messageText }],
        },
      }),
    };

    try {
      const response = await fetch(`${agentApi}/run`, options);
      if (!response.ok) {
        // Try to get error message from backend response if available
        let errorText = `API error: ${response.status}`;
        try {
            const errorData = await response.json();
            errorText = errorData.message || errorData.detail || errorText;
        } catch (e) { /* ignore if response is not json */ }
        throw new Error(errorText);
      }
      const responseData = await response.json();

      // Extract bot's response text - adjust based on your actual API response structure
      const botText = responseData[responseData.length - 1]?.content?.parts?.[0]?.text;

      if (botText) {
        const parsedHtml = marked.parse(botText);
        addBotMessage(parsedHtml, true); // Add bot message as HTML
      } else {
        addBotMessage("Received an empty response from the assistant.", true);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      addBotMessage(`An error occurred: ${err.message || "Please try again."}`, true);
    } finally {
      setIsSending(false);
      // Consider focusing input field again, if desired
      // if (inputRef.current) inputRef.current.focus();
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

      <Header />
      <MessageList messages={messages} />
      {/* Pass inputRef to MessageInput if you implement auto-focus there */}
      <MessageInput onSendMessage={handleSendMessage} isSending={isSending} />
    </div>
  );
}