import ws from "../ws";
import { speakerContainer } from "./consts";

export default function selectUser(
  login: string,
  isLogined: boolean | undefined,
) {
  speakerContainer.innerText = `${login} - ${isLogined === true ? "Online" : "Offline"}`;
  ws.send(
    JSON.stringify({
      id: "4",
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login,
        },
      },
    }),
  );
}
