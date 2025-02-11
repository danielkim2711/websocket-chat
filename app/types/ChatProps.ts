export interface ChatMessageType {
  nickname: string;
  content: string;
  timestamp: string;
  type?: 'chat';
}

interface SystemMessageType {
  type: 'system';
  action: 'join' | 'leave';
  nickname: string;
}

export type Message = ChatMessageType | SystemMessageType;
