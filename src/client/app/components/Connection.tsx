import { useSocket } from "../socket";

export default function Connection() {
  const { isConnected } = useSocket();
  return <p>Socket is {isConnected ? "connected" : "disconnected"}</p>;
}
