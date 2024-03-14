import "./style.css";
import drawLogInForm from "./logInForm";
import drawStartScreen from "./startScreen";

if (!localStorage.user) {
  drawLogInForm();
} else {
  drawStartScreen(localStorage.user);
}
