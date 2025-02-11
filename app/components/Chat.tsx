'use client';

// Components
import { NicknameModal } from './NicknameModal';
import { ChatMessage } from './ChatMessage';
import { ParticipantsList } from './ParticipantsList';
import { ChatInput } from './ChatInput';

// Types
import { ChatMessageType, Message } from '../types/ChatProps';

// Hooks
import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [nickname, setNickname] = useState<string>('');
  const [showModal, setShowModal] = useState(true);

  const { sendMessage } = useWebSocket({
    url: 'ws://localhost:3001',
    nickname,
    onMessage: (event) => {
      const messageData = JSON.parse(event.data) as Message;

      if (messageData.type === 'system') {
        setParticipants((prev) => {
          if (messageData.action === 'join') {
            return [...prev, messageData.nickname];
          } else if (messageData.action === 'leave') {
            return prev.filter((name) => name !== messageData.nickname);
          }
          return prev;
        });
      }

      setMessages((prev) => [...prev, messageData]);
    },
    enabled: Boolean(nickname),
  });

  const handleSend = () => {
    if (inputMessage.trim() && nickname) {
      const messageData: ChatMessageType = {
        nickname,
        content: inputMessage.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      sendMessage(JSON.stringify(messageData));
      setInputMessage('');
    }
  };

  const handleNicknameSubmit = (newNickname: string) => {
    setNickname(newNickname);
    setShowModal(false);
  };

  return (
    <>
      <NicknameModal isOpen={showModal} onSubmit={handleNicknameSubmit} />
      {nickname && (
        <div className='flex h-screen max-w-6xl mx-auto p-4 gap-4'>
          <div className='flex flex-col flex-1'>
            <div className='flex-1 overflow-y-auto mb-4 space-y-2'>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  currentUserNickname={nickname}
                />
              ))}
            </div>
            <ChatInput
              value={inputMessage}
              onChange={setInputMessage}
              onSend={handleSend}
            />
          </div>
          <ParticipantsList participants={participants} />
        </div>
      )}
    </>
  );
}
