import { User } from "../Interfaces/interfaces";
import { chatContainer, footer, header, logOutButton, user } from "./consts";
import logOut from "./logOut";

let currentUser: User;

export default function drawMainPage(sentCurrentUser: User) {
  currentUser = sentCurrentUser;
  user.innerText = currentUser.login;
  document.body.append(header, chatContainer, footer);
  logOutButton.addEventListener("click", () => {
    logOut(currentUser);
  });
}
