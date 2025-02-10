// Multivariate Dependencies
import React, { useState } from 'react';

// Types
import type { NicknameModalProps } from '../types/NicknameModalProps';

export function NicknameModal({ isOpen, onSubmit }: NicknameModalProps) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nickname.trim()) {
      onSubmit(nickname.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96'>
        <h2 className='text-xl font-bold mb-4'>Enter your nickname</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className='w-full p-2 border rounded dark:bg-gray-700 mb-4'
            placeholder='nickname'
            autoFocus
          />
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
            disabled={!nickname.trim()}
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
