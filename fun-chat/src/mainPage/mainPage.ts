import { User } from "../Interfaces/interfaces";
import ws from "../ws";
import {
  chatContainer,
  footer,
  header,
  logOutButton,
  user,
  userListContainer,
} from "./consts";
import logOut from "./logOut";

let currentUser: User;

function getUsers() {
  ws.send(
    JSON.stringify({
      id: "2",
      type: "USER_ACTIVE",
      payload: null,
    }),
  );
  ws.send(
    JSON.stringify({
      id: "2",
      type: "USER_INACTIVE",
      payload: null,
    }),
  );
}

export default function drawMainPage(sentCurrentUser: User) {
  currentUser = sentCurrentUser;
  user.innerText = currentUser.login;
  document.body.append(header, chatContainer, footer);
  getUsers();
}

logOutButton.addEventListener("click", () => {
  logOut(currentUser);
});

ws.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  if (message.type === "USER_ACTIVE" || message.type === "USER_INACTIVE") {
    const { users } = message.payload;
    users.forEach((el: User) => {
      if (el.login !== currentUser.login) {
        const userLi = document.createElement("div");
        userLi.innerText = `${el.login} - ${message.type === "USER_ACTIVE" ? "Online" : "Offline"}`;
        userLi.dataset.id = el.login;
        userListContainer.append(userLi);
      }
    });
  } else if (
    message.type === "USER_EXTERNAL_LOGIN" ||
    message.type === "USER_EXTERNAL_LOGOUT"
  ) {
    userListContainer.innerHTML = "";
    getUsers();
  }
});
