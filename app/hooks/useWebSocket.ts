// Hooks
import { useEffect, useRef, useState } from 'react';

interface UseWebSocketOptions {
  url: string;
  nickname: string;
  onMessage: (event: MessageEvent) => void;
  enabled?: boolean;
}

interface SystemMessage {
  type: 'system';
  action: 'join' | 'leave';
  nickname: string;
}

export function useWebSocket({
  url,
  nickname,
  onMessage,
  enabled = true,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const onMessageCallback = useRef(onMessage);

  useEffect(() => {
    onMessageCallback.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!enabled) return;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      if (ws.current && nickname) {
        const joinMessage: SystemMessage = {
          type: 'system',
          action: 'join',
          nickname,
        };
        ws.current.send(JSON.stringify(joinMessage));
      }
    };

    ws.current.onmessage = (event) => {
      onMessageCallback.current(event);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      if (ws.current && nickname) {
        const leaveMessage: SystemMessage = {
          type: 'system',
          action: 'leave',
          nickname,
        };
        ws.current.send(JSON.stringify(leaveMessage));
      }
    };

    return () => {
      if (ws.current) {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
      }
    };
  }, [url, nickname, enabled]);

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      ws.current.send(message);
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return { isConnected, sendMessage };
}
