import { useState } from "react";
import { useSocket } from "../socket";

export default function ServerMessages() {
  const [messages, setMessages] = useState<string[]>([]);
  useSocket({
    broadcast: (message) => {
      setMessages([...messages, message]);
    },
  });
  return (
    <div>
      <h2>Server Messages</h2>
      <pre>{messages.join("\n")}</pre>
    </div>
  );
}
