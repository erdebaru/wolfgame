import { io } from "socket.io-client";
import { ClientSocket, ServerToClientEvents } from "../../types";
import { useEffect, useState } from "react";

// "undefined" means the URL will be computed from the `window.location` object
const URL = undefined;

const socket: ClientSocket = io(URL, {
  path: "/ws",
});

type SocketEvent = ServerToClientEvents;

export const useSocket = (events?: Partial<SocketEvent>) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    if (events) {
      for (const e of Object.keys(events)) {
        const event = e as keyof ServerToClientEvents;
        if (events[event]) socket.on(event, events[event]);
      }
    }
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      if (events) {
        for (const e of Object.keys(events)) {
          const event = e as keyof ServerToClientEvents;
          socket.off(event, events[event]);
        }
      }
    };
  }, []);

  return { socket, isConnected };
};
