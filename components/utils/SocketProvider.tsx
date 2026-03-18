"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Socket } from "socket.io-client";
import { getSocket, disconnectSocket } from "@/lib/socket";
import getToken from "@/auth/getToken";

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
});

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const s = getSocket(token);

      s.on("connect", () => setIsConnected(true));
      s.on("disconnect", () => setIsConnected(false));

      setSocket(s);
    } catch {
      // Not logged in — skip socket
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
    };
  }, [connect]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
