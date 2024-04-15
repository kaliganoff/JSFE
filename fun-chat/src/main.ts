import drawLogInForm from "./logInForm/logInForm";
import "./style.css";
import ws from "./ws";

ws.addEventListener("open", () => {
  if (!sessionStorage.userKaliganoff) {
    drawLogInForm();
  } else {
    alert(JSON.parse(sessionStorage.userKaliganoff).login);
  }
});
