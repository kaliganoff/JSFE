import "./style.css";
import drawLogInForm from "./logInForm";

if (!localStorage.user) {
  drawLogInForm();
}
