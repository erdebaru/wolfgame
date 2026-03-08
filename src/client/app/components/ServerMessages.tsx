import { SubmitEventHandler, useEffect, useRef, useState } from "react";
import { useSocket } from "../socket";
import { useStore } from "../store";
import { ChatMessage } from "../../../types";

export default function ServerMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [state] = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { socket } = useSocket({
    broadcast: (message) => {
      if (Array.isArray(message)) {
        setMessages((prev) => [...prev, ...message]);
      } else {
        setMessages((prev) => [...prev, message]);
      }
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const onSend: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    console.log("sending message", state.uuid);
    socket.emit("message", inputMessage, state.uuid, "game");
    setInputMessage("");
  };

  return (
    <div className="px-2 py-2 bg-slate-800 text-slate-300 flex-10/12 flex flex-col h-full overflow-hidden">
      <h2 className="text-xl font-bold mb-2">Message Lobby</h2>
      <div
        ref={scrollRef}
        className="bg-slate-900 p-4 flex-1 rounded-t flex flex-col gap-3 overflow-y-auto"
      >
        {messages.map((m) => {
          const isSystem = !m.senderId;
          const isSelf = m.senderId === state.uuid;

          if (isSystem) {
            return (
              <div key={m.id} className="text-center w-full my-1">
                <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full italic">
                  {m.content}
                </span>
              </div>
            )
          }

          return (
            <div
              key={m.id}
              className={`flex flex-col max-w-[80%] ${isSelf ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <span className="text-xs text-slate-500 mb-1 px-1">
                {isSelf ? "You" : m.senderName} • {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div
                className={`px-4 py-2 rounded-2xl ${isSelf ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-700 text-slate-100 rounded-tl-sm'}`}
              >
                {m.content}
              </div>
            </div>
          )
        })}
      </div>
      <form className="rounded-b bg-slate-950 flex p-2 gap-2" onSubmit={onSend}>
        <input
          type="text"
          className="px-4 py-2 flex-1 rounded-full bg-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2 rounded-full transition-colors"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
