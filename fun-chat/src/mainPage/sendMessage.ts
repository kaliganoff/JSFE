import { User } from "../Interfaces/interfaces";
import ws from "../ws";

export default function sendMessage(message: string, speaker: User) {
  ws.send(
    JSON.stringify({
      id: "5",
      type: "MSG_SEND",
      payload: {
        message: {
          to: speaker.login,
          text: message,
        },
      },
    }),
  );
}
