import React, { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface'; // Assuming ChatInterface is in the same directory

export default function ChatWrapper() {
  const [theme, setTheme] = useState('dark'); // Default theme

  useEffect(() => {
    // Set the initial theme based on localStorage or system preference if desired
    const savedTheme = localStorage.getItem('chatTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !savedTheme) {
      setTheme('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches && !savedTheme) {
      setTheme('light');
    }
  }, []);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('chatTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('chatTheme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ChatInterface theme={theme} toggleTheme={toggleTheme} />;
}