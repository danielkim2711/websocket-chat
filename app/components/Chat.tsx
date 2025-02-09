'use client';

// Hooks
import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

export function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const { sendMessage } = useWebSocket({
    url: 'ws://localhost:3001',
    onMessage: (event) => {
      setMessages((prev) => [...prev, event.data]);
    },
  });

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='flex flex-col h-screen max-w-2xl mx-auto p-4'>
      <div className='flex-1 overflow-y-auto mb-4 space-y-2'>
        {messages.map((msg, index) => (
          <div key={index} className='p-2 bg-gray-100 dark:bg-gray-800 rounded'>
            {msg}
          </div>
        ))}
      </div>
      <div className='flex gap-2'>
        <input
          type='text'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className='flex-1 p-2 border rounded dark:bg-gray-800'
          placeholder='Send message...'
        />
        <button
          onClick={handleSend}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Send
        </button>
      </div>
    </div>
  );
}
