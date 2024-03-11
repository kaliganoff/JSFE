export default function drawLogInForm() {
  const logInForm = document.createElement("form");
  logInForm.className = "log-in-form";
  const nameInput = document.createElement("input");
  nameInput.id = "name";
  nameInput.required = true;
  const nameLabel: HTMLLabelElement = document.createElement("label");
  nameLabel.innerText = "First Name";
  nameLabel.htmlFor = "name";
  const surnameInput = document.createElement("input");
  surnameInput.id = "surname";
  surnameInput.required = true;
  nameInput.className = "log-in-input";
  surnameInput.className = "log-in-input";
  const surnameLabel = document.createElement("label");
  surnameLabel.innerText = "Surname";
  surnameLabel.htmlFor = "surname";
  const logInButton = document.createElement("button");
  logInButton.innerText = "Log In";
  logInButton.type = "submit";
  logInButton.className = "log-in-button";

  document.body.append(logInForm);
  logInForm.append(nameLabel);
  logInForm.append(nameInput);
  logInForm.append(surnameLabel);
  logInForm.append(surnameInput);
  logInForm.append(logInButton);

  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
