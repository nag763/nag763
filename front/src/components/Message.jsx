// src/components/Message.jsx

const Message = ({ text, sender, isBot, isHtml, isTypingIndicator, hidden }) => { // Added isTypingIndicator
  if(hidden) {
    return <></>
  }
  
  const bgColor = isBot ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-500 dark:bg-blue-600';
  const textColor = isBot ? 'text-gray-800 dark:text-gray-200' : 'text-white';
  const alignment = isBot ? 'self-start' : 'self-end';
  const borderRadius = isBot
    ? 'rounded-r-lg rounded-bl-lg'
    : 'rounded-l-lg rounded-br-lg';

  const contentClass = isBot && isHtml ? 'prose prose-sm dark:prose-invert max-w-none' : '';

  if (isBot && isTypingIndicator) {
    return (
      <div className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 my-1 self-start ${bgColor} ${textColor} ${borderRadius} shadow-sm`}>
        <div className="flex items-center">
          {/* Optional: Show "Bot is typing" text or just the dots */}
          {/* <span className="mr-1 text-sm">{text}</span>  */}
          <div className="typing-dots h-4 flex items-center"> {/* Ensure h-4 or similar for dot alignment */}
            <span className="dot w-1.5 h-1.5 bg-current rounded-full"></span>
            <span className="dot w-1.5 h-1.5 bg-current rounded-full"></span>
            <span className="dot w-1.5 h-1.5 bg-current rounded-full"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-[80%] sm:max-w-[70%] p-3 my-1 ${alignment} ${bgColor} ${textColor} ${borderRadius} shadow-sm`}>
      {isHtml && isBot ? (
        <div className={contentClass} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <div className="break-words">{text}</div>
      )}
    </div>
  );
};

export default Message;