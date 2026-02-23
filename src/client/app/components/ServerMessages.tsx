import { SubmitEventHandler, useState } from "react";
import { useSocket } from "../socket";
import { useStore } from "../store";

export default function ServerMessages() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [state] = useStore();
  const { socket } = useSocket({
    broadcast: (message) => {
      if (typeof message === "string")
        setMessages((prev) => [...prev, message]);
      else setMessages((prev) => [...prev, ...message]);
    },
  });

  const onSend: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("sending message", state.uuid);
    socket.emit("message", message, state.uuid, "game");
  };

  return (
    <div className="px-2 py-2 bg-slate-600 text-slate-400 flex-10/12 flex flex-col">
      <h2>Server Messages</h2>
      <pre className="bg-slate-900 p-2 flex-1 rounded-t">
        {messages.join("\n")}
      </pre>
      <form className="rounded-b bg-slate-950 flex" onSubmit={onSend}>
        <input
          type="text"
          className="p-2 flex-1 rounded-l"
          placeholder="Message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-green-800 text-green-500 px-4 cursor-pointer rounded-br"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
