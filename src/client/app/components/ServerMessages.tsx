import { useState } from "react";
import { useSocket } from "../socket";

export default function ServerMessages() {
  const [messages, setMessages] = useState<string[]>([]);
  useSocket({
    broadcast: (message) => {
      console.log("broadcast", message);
      setMessages((prev) => [...prev, message]);
    },
  });
  return (
    <div className="px-2 py-2 bg-slate-600 text-slate-400 flex-1 flex flex-col">
      <h2>Server Messages</h2>
      <pre className="bg-slate-900 p-2 py-2 flex-1 rounded">
        {messages.join("\n")}
      </pre>
    </div>
  );
}
