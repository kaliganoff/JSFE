import ws from "../ws";
import { logInForm, loginInput, passwordInput, submitButton } from "./consts";
import validate from "./validate";

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
  ws.addEventListener("message", (e) => {
    const message = JSON.parse(e.data);
    if (message.type === "USER_LOGIN") {
      const currentUser = { login: message.payload.user.login };
      sessionStorage.userKaliganoff = JSON.stringify(currentUser);
    }
  });
}

export default function drawLogInForm() {
  logInForm.append(loginInput, passwordInput, submitButton);
  document.body.append(logInForm);
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    logIn();
    loginInput.value = "";
    passwordInput.value = "";
    submitButton.disabled = true;
  });
}

logInForm.addEventListener("input", () => {
  validate();
});

ws.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  if (message.type === "ERROR") {
    alert(message.payload.error);
  }
});
