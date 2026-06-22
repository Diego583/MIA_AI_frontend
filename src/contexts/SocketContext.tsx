'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'mia';
  timestamp: string;
  metadata?: {
    responseTime?: number;
    tokens?: number;
  };
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isAuthenticated: boolean;
  messages: Message[];
  isTyping: boolean;
  isMiaTyping: boolean;
  sendMessage: (content: string, sessionId?: string) => void;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  error: string | null;
  clearError: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user, getAccessToken, refreshToken } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMiaTyping, setIsMiaTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pendingMessageRef = useRef<{ content: string; sessionId?: string } | null>(null);
  const reauthInFlightRef = useRef(false);

  useEffect(() => {
    if (!user) {
      setIsConnected(false);
      setIsAuthenticated(false);
      setMessages([]);
      return;
    }

    const newSocket = io(WS_URL, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    // Authenticate on every (re)connect, reading the live in-memory token.
    const authenticate = () => {
      const token = getAccessToken();
      if (token) {
        newSocket.emit('authenticate', { token });
      } else {
        setError('Not authenticated. Please refresh the page.');
      }
    };

    newSocket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      authenticate();
    });

    newSocket.on('auth_error', async (data) => {
      setIsAuthenticated(false);

      // Only attempt recovery for expiry; a genuine auth failure shouldn't loop.
      if (data?.code === 'TOKEN_EXPIRED' && !reauthInFlightRef.current) {
        reauthInFlightRef.current = true;
        const ok = await refreshToken();          // silent HTTP refresh, updates in-memory token
        reauthInFlightRef.current = false;

        if (ok) {
          const token = getAccessToken();
          if (token) newSocket.emit('authenticate', { token });
          return;                                  // replay happens in the 'authenticated' handler
        }
      }

      setError(data?.error || 'Authentication failed');
    });

    newSocket.on('authenticated', () => {
      setIsAuthenticated(true);
      setError(null);

      // If a message was waiting on reauth, send it now.
      if (pendingMessageRef.current) {
        const { content, sessionId } = pendingMessageRef.current;
        pendingMessageRef.current = null;
        newSocket.emit('send_message', { content: content.trim(), sessionId });
      }
    });

    newSocket.on('disconnect', (reason) => {
      setIsConnected(false);
      setIsAuthenticated(false);
    });

    newSocket.on('error', (err) => {
      setError(err?.error || 'Connection error');
    });

    newSocket.on('message_sent', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('mia_response', (message: Message) => {
      setMessages(prev => [...prev, message]);
      setIsMiaTyping(false);
    });

    newSocket.on('mia_typing', (data: { isTyping: boolean }) => {
      setIsMiaTyping(data.isTyping);
    });

    newSocket.on('user_typing', () => {
      // multi-device sync placeholder
    });

    newSocket.on('connect_error', () => {
      setError('Failed to connect to chat server');
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id]);

  const sendMessage = (content: string, sessionId?: string) => {
    if (!socket || !content.trim()) return;

    if (isAuthenticated) {
      socket.emit('send_message', { content: content.trim(), sessionId });
      setError(null);
    } else {
      // Not currently authenticated — hold the message and trigger reauth.
      pendingMessageRef.current = { content, sessionId };
      const token = getAccessToken();
      if (token) {
        socket.emit('authenticate', { token });
      } else {
        refreshToken().then(ok => {
          const t = ok ? getAccessToken() : null;
          if (t && socket) socket.emit('authenticate', { token: t });
          else setError('Session expired. Please refresh the page.');
        });
      }
    }
  };

  const setTyping = (typing: boolean) => {
    setIsTyping(typing);
    if (socket && isAuthenticated) {
      socket.emit('user_typing', { isTyping: typing });
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const clearError = () => {
    setError(null);
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    isAuthenticated,
    messages,
    isTyping,
    isMiaTyping,
    sendMessage,
    setTyping,
    clearMessages,
    error,
    clearError,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};