import drawLogInForm from "./logInForm/logInForm";
import drawMainPage from "./mainPage/mainPage";
import "./style.css";
import ws from "./ws";

ws.addEventListener("open", () => {
  if (!sessionStorage.userKaliganoff) {
    drawLogInForm();
  } else {
    drawMainPage(JSON.parse(sessionStorage.userKaliganoff));
  }
});
