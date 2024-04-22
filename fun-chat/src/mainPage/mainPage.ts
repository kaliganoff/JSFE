import { User, Message } from "../Interfaces/interfaces";
import ws from "../ws";
import {
  chatContainer,
  chatInput,
  dialogueContainer,
  dialogueContainerWrapper,
  footer,
  header,
  logOutButton,
  mainPageContainer,
  messageContainer,
  sendButton,
  user,
  userListContainer,
} from "./consts";
import deleteMessage from "./deleteMessage";
import logOut from "./logOut";
import selectUser from "./selectUser";
import sendMessage from "./sendMessage";

let currentUser: User;
let selectedUser: User;

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
  mainPageContainer.append(header, chatContainer, footer);
  document.body.append(mainPageContainer);
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
        const userLi: HTMLDivElement = document.createElement("div");
        userLi.className = "hover";
        userLi.innerText = `${el.login} - ${message.type === "USER_ACTIVE" ? "Online" : "Offline"}`;
        userLi.dataset.id = el.login;
        userListContainer.append(userLi);
        userLi.addEventListener("click", () => {
          selectedUser = el;
          sendButton.disabled = false;
          chatInput.disabled = false;
          selectUser(el.login, el.isLogined);
        });
      }
    });
  } else if (
    message.type === "USER_EXTERNAL_LOGIN" ||
    message.type === "USER_EXTERNAL_LOGOUT"
  ) {
    userListContainer.innerHTML = "";
    getUsers();
  } else if (
    message.type === "MSG_SEND" ||
    message.type === "MSG_DELIVER" ||
    message.type === "MSG_DELETE"
  ) {
    if (message.type === "MSG_SEND") {
      setTimeout(() => {
        dialogueContainerWrapper.scrollTop = dialogueContainer.scrollHeight;
      }, 50);
    }
    selectUser(selectedUser.login, selectedUser.isLogined);
  }
});

messageContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(chatInput.value, selectedUser);
  chatInput.value = "";
  setTimeout(() => {
    dialogueContainerWrapper.scrollTop = dialogueContainer.scrollHeight;
  }, 50);
});

ws.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  if (message.type === "MSG_FROM_USER") {
    dialogueContainer.innerHTML = "";
    const { messages } = message.payload;
    messages.forEach((msg: Message) => {
      const messageLi: HTMLDivElement = document.createElement("div");
      let msgStatus = "";
      if (msg.from === currentUser.login) {
        if (msg.status.isReaded) {
          msgStatus = "Read";
        } else if (msg.status.isDelivered) {
          msgStatus = "Delivered";
        } else {
          msgStatus = "Not delivered";
        }
      }
      messageLi.innerText = `${msg.from}: ${msg.text}\n ${String(new Date(msg.datetime).getHours()).padStart(2, "0")}:${String(new Date(msg.datetime).getMinutes()).padStart(2, "0")} ${msgStatus}`;
      if (msg.from === currentUser.login) {
        const deleteButton: HTMLButtonElement =
          document.createElement("button");
        deleteButton.className = "hover";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteMessage(msg.id);
        });
        messageLi.append(deleteButton);
      }
      dialogueContainer.append(messageLi);
    });
    if (messages.length === 0) {
      dialogueContainer.innerText = "This is the beginning of the dialogue";
    }
  }
});
