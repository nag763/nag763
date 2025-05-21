// src/components/Message.jsx

const Message = ({ text, sender, isBot, isHtml }) => { // Added isHtml prop
  const bgColor = isBot ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-500 dark:bg-blue-600';
  const textColor = isBot ? 'text-gray-800 dark:text-gray-200' : 'text-white';
  const alignment = isBot ? 'self-start' : 'self-end';
  const borderRadius = isBot
    ? 'rounded-r-lg rounded-bl-lg'
    : 'rounded-l-lg rounded-br-lg';

  // Apply prose class for better markdown styling if content is HTML from marked
  const contentClass = isBot && isHtml ? 'prose prose-sm dark:prose-invert max-w-none' : '';

  return (
    <div className={`max-w-[80%] sm:max-w-[70%] p-3 my-1 ${alignment} ${bgColor} ${textColor} ${borderRadius} shadow-sm`}>
      {isHtml && isBot ? (
        <div className={contentClass} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <div className="break-words">{text}</div> // Ensure text breaks for non-HTML too
      )}
    </div>
  );
};

export default Message;