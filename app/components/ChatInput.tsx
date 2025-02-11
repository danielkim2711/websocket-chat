interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className='flex gap-2'>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className='flex-1 p-2 border rounded dark:bg-gray-800'
        placeholder='Enter your message...'
      />
      <button
        onClick={onSend}
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Send
      </button>
    </div>
  );
}
