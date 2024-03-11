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
logInButton.disabled = true;
const error = document.createElement("p");
const errorSurname = document.createElement("p");
error.className = "log-in-form-error";
errorSurname.className = "log-in-form-error";

function validate() {
  const validateName = /^[A-Z][A-Za-z-][A-Za-z-]+$/.test(nameInput.value);
  const validateSurname = /^[A-Z][A-Za-z-]{2}[A-Za-z-]+$/.test(
    surnameInput.value,
  );
  if (!/^[A-Z]/.test(nameInput.value)) {
    nameInput.style.borderColor = "red";
    error.innerText = "The first letter must be uppercase";
    nameInput.insertAdjacentElement("afterend", error);
  } else if (!/^[A-Za-z-]+$/.test(nameInput.value)) {
    nameInput.style.borderColor = "red";
    error.innerText =
      "The first name must contain only English letters and '-'";
    nameInput.insertAdjacentElement("afterend", error);
  } else if (!/^[A-Za-z-]{2}[A-Za-z-]+$/.test(nameInput.value)) {
    nameInput.style.borderColor = "red";
    error.innerText = "The first name must contain three or more characters";
    nameInput.insertAdjacentElement("afterend", error);
  } else if (validateName) {
    error.remove();
    nameInput.style.borderColor = "";
  }

  if (!/^[A-Z]/.test(surnameInput.value)) {
    surnameInput.style.borderColor = "red";
    errorSurname.innerText = "The first letter must be uppercase";
    surnameInput.insertAdjacentElement("afterend", errorSurname);
  } else if (!/^[A-Za-z-]+$/.test(surnameInput.value)) {
    surnameInput.style.borderColor = "red";
    errorSurname.innerText =
      "The surname must contain only English letters and '-'";
    surnameInput.insertAdjacentElement("afterend", errorSurname);
  } else if (!/^[A-Za-z-]{3}[A-Za-z-]+$/.test(surnameInput.value)) {
    surnameInput.style.borderColor = "red";
    errorSurname.innerText = "The surname must contain four or more characters";
    surnameInput.insertAdjacentElement("afterend", errorSurname);
  } else if (validateSurname) {
    errorSurname.remove();
    surnameInput.style.borderColor = "";
  }

  if (validateName && validateSurname) {
    logInButton.disabled = false;
  } else if (!validateName || !validateSurname) {
    logInButton.disabled = true;
  }
}

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

logInForm.addEventListener("input", () => {
  validate();
});

export default function drawLogInForm() {
  document.body.append(logInForm);
  logInForm.append(nameLabel);
  logInForm.append(nameInput);
  logInForm.append(surnameLabel);
  logInForm.append(surnameInput);
  logInForm.append(logInButton);
}
