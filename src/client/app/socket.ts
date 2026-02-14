import { io } from "socket.io-client";
import { ClientSocket } from "../../types";
import { useEffect, useState } from "react";

// "undefined" means the URL will be computed from the `window.location` object
const URL = undefined;

export const socket: ClientSocket = io(URL, {
  path: "/ws",
});

export const useSocket = () => {
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
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return [isConnected, setIsConnected];
};
