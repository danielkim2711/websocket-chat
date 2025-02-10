'use client';

// Hooks
import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { NicknameModal } from './NicknameModal';

interface ChatMessage {
  nickname: string;
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [nickname, setNickname] = useState<string>('');
  const [showModal, setShowModal] = useState(true);

  const { sendMessage } = useWebSocket({
    url: 'ws://localhost:3001',
    onMessage: (event) => {
      const messageData = JSON.parse(event.data) as ChatMessage;
      setMessages((prev) => [...prev, messageData]);
    },
  });

  const handleSend = () => {
    if (inputMessage.trim() && nickname) {
      const messageData: ChatMessage = {
        nickname,
        content: inputMessage.trim(),
      };

      sendMessage(JSON.stringify(messageData));
      setMessages((prev) => [...prev, messageData]);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleNicknameSubmit = (newNickname: string) => {
    setNickname(newNickname);
    setShowModal(false);
  };

  return (
    <>
      <NicknameModal isOpen={showModal} onSubmit={handleNicknameSubmit} />
      <div className='flex flex-col h-screen max-w-2xl mx-auto p-4'>
        <div className='flex-1 overflow-y-auto mb-4 space-y-2'>
          {messages.map(({ nickname: messageNickname, content }, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                messageNickname === nickname
                  ? 'bg-yellow-100 dark:bg-yellow-900'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <span className='font-bold'>{messageNickname}: </span>
              {content}
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
            placeholder='Enter your message...'
          />
          <button
            onClick={handleSend}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
