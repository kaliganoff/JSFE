import { User } from "../Interfaces/interfaces";
import ws from "../ws";

export default function logOut(currentUser: User) {
  ws.send(
    JSON.stringify({
      id: "1",
      type: "USER_LOGOUT",
      payload: {
        user: {
          login: currentUser.login,
          password: currentUser.password,
        },
      },
    }),
  );
}
