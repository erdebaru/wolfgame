import { ServerSocket } from "../../types";
import Store from "../store";

export default function handler(socket: ServerSocket) {
  socket.on("message", (message, uuid) => {
    const player = Store.playerMap.get(uuid);
    Store.game?.message(message, player);
  });
}
