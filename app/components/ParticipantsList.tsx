interface ParticipantsListProps {
  participants: string[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className='w-64 bg-gray-100 dark:bg-gray-800 rounded p-4'>
      <h2 className='font-bold mb-4'>Participants ({participants.length})</h2>
      <div className='space-y-2'>
        {participants.map((participantName, index) => (
          <div key={index} className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <span>{participantName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
