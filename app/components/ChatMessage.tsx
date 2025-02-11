import { Message } from '../types/ChatProps';

interface ChatMessageProps {
  message: Message;
  currentUserNickname: string;
}

export function ChatMessage({
  message,
  currentUserNickname,
}: ChatMessageProps) {
  if (message.type === 'system') {
    return (
      <div className='text-center text-sm text-gray-500'>
        {message.nickname} has {message.action}ed the chat
      </div>
    );
  }

  return (
    <div
      className={`p-2 rounded ${
        message.nickname === currentUserNickname
          ? 'bg-yellow-100 dark:bg-yellow-900'
          : 'bg-gray-100 dark:bg-gray-800'
      }`}
    >
      <div className='flex justify-between items-start'>
        <div>
          <span className='font-bold'>{message.nickname}: </span>
          {message.content}
        </div>
        <span className='text-xs text-gray-500 ml-2'>{message.timestamp}</span>
      </div>
    </div>
  );
}
