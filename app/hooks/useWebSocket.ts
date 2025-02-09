// Hooks
import { useEffect, useRef, useState } from 'react';

interface UseWebSocketProps {
  url: string;
  onMessage?: (event: MessageEvent) => void;
}

export const useWebSocket = ({ url, onMessage }: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log('Message received:', event.data);
      onMessage?.(event);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    wsRef.current = ws;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      wsRef.current.send(message);
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return { isConnected, sendMessage };
};
