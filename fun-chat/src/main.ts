import drawLogInForm from "./logInForm/logInForm";
import "./style.css";
import ws from "./ws";

ws.addEventListener("open", () => {
  drawLogInForm();
});
