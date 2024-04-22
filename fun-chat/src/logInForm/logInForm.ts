import { User } from "../Interfaces/interfaces";
import { mainPageContainer, userListContainer } from "../mainPage/consts";
import drawMainPage from "../mainPage/mainPage";
import ws from "../ws";
import { logInForm, loginInput, passwordInput, submitButton } from "./consts";
import validate from "./validate";

let password = "";
let currentUser: User;

function logIn() {
  ws.send(
    JSON.stringify({
      id: "1",
      type: "USER_LOGIN",
      payload: {
        user: {
          login: loginInput.value,
          password: passwordInput.value,
        },
      },
    }),
  );
}

export default function drawLogInForm() {
  logInForm.append(loginInput, passwordInput, submitButton);
  document.body.append(logInForm);
}

logInForm.addEventListener("input", () => {
  validate();
});

ws.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  if (message.type === "ERROR") {
    alert(message.payload.error);
  } else if (
    message.type === "USER_LOGOUT" &&
    message.payload.user.isLogined === false
  ) {
    delete sessionStorage.user;
    document.body.innerHTML = "";
    mainPageContainer.innerHTML = "";
    userListContainer.innerHTML = "";
    drawLogInForm();
  } else if (
    message.type === "USER_LOGIN" &&
    message.payload.user.isLogined === true
  ) {
    currentUser = { login: message.payload.user.login, password };
    sessionStorage.userKaliganoff = JSON.stringify(currentUser);
    logInForm.innerHTML = "";
    drawMainPage(currentUser);
  }
});

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (loginInput.value !== "" && passwordInput.value !== "") {
    logIn();
    password = passwordInput.value;
    loginInput.value = "";
    passwordInput.value = "";
    submitButton.disabled = true;
  }
});
