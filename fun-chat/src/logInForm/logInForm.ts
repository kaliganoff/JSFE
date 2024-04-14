import ws from "../ws";

const logInForm = document.createElement("form");
logInForm.className = "log-in-form";
const loginInput = document.createElement("input");
const passwordInput = document.createElement("input");
const submitButton = document.createElement("button");
submitButton.innerText = "Log In";
const error = document.createElement("p");
const errorSurname = document.createElement("p");
error.className = "log-in-form-error";
errorSurname.className = "log-in-form-error";

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
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    logIn();
    loginInput.value = "";
    passwordInput.value = "";
  });
}

function validate() {
  const validateName = /^[A-Z][A-Za-z-][A-Za-z-]+$/.test(loginInput.value);
  const validateSurname = /^[A-Z][A-Za-z-]{2}[A-Za-z-]+$/.test(
    passwordInput.value,
  );
  if (!/^[A-Z]/.test(loginInput.value)) {
    loginInput.style.borderColor = "red";
    error.innerText = "The first letter must be uppercase";
    loginInput.insertAdjacentElement("afterend", error);
  } else if (!/^[A-Za-z-]+$/.test(loginInput.value)) {
    loginInput.style.borderColor = "red";
    error.innerText =
      "The first name must contain only English letters and '-'";
    loginInput.insertAdjacentElement("afterend", error);
  } else if (!/^[A-Za-z-]{2}[A-Za-z-]+$/.test(loginInput.value)) {
    loginInput.style.borderColor = "red";
    error.innerText = "The first name must contain three or more characters";
    loginInput.insertAdjacentElement("afterend", error);
  } else if (validateName) {
    error.remove();
    loginInput.style.borderColor = "";
  }

  if (!/^[A-Z]/.test(passwordInput.value)) {
    passwordInput.style.borderColor = "red";
    errorSurname.innerText = "The first letter must be uppercase";
    passwordInput.insertAdjacentElement("afterend", errorSurname);
  } else if (!/^[A-Za-z-]+$/.test(passwordInput.value)) {
    passwordInput.style.borderColor = "red";
    errorSurname.innerText =
      "The surname must contain only English letters and '-'";
    passwordInput.insertAdjacentElement("afterend", errorSurname);
  } else if (!/^[A-Za-z-]{3}[A-Za-z-]+$/.test(passwordInput.value)) {
    passwordInput.style.borderColor = "red";
    errorSurname.innerText = "The surname must contain four or more characters";
    passwordInput.insertAdjacentElement("afterend", errorSurname);
  } else if (validateSurname) {
    errorSurname.remove();
    passwordInput.style.borderColor = "";
  }

  if (validateName && validateSurname) {
    submitButton.disabled = false;
    submitButton.classList.add("log-in-button_active");
  } else if (!validateName || !validateSurname) {
    submitButton.disabled = true;
    submitButton.classList.remove("log-in-button_active");
  }
}

logInForm.addEventListener("input", () => {
  validate();
});
