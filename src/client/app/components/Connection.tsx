import { useSocket } from "../socket";

export default function Connection() {
  const { isConnected } = useSocket();
  return (
    <div className="bg-slate-900 text-slate-300 p-2">
      <p className="animate-pulse">
        Socket is {isConnected ? "connected" : "disconnected"}
      </p>
    </div>
  );
}
