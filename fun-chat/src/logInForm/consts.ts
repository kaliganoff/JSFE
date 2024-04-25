import drawAboutPage from "../aboutPage/aboutPage";

export const logInForm: HTMLFormElement = document.createElement("form");
logInForm.className = "log-in-form";
export const loginInput: HTMLInputElement = document.createElement("input");
export const passwordInput: HTMLInputElement = document.createElement("input");
passwordInput.type = "password";
export const submitButton: HTMLButtonElement = document.createElement("button");
submitButton.innerText = "Log In";
submitButton.className = "hover";
export const aboutButton: HTMLButtonElement = document.createElement("button");
aboutButton.innerText = "About";
aboutButton.className = "hover";
aboutButton.onclick = drawAboutPage;
export const error: HTMLParagraphElement = document.createElement("p");
export const errorPassword: HTMLParagraphElement = document.createElement("p");
error.className = "log-in-form-error";
errorPassword.className = "log-in-form-error";
