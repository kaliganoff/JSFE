import {
  loginInput,
  passwordInput,
  submitButton,
  error,
  errorPassword,
} from "./consts";

export default function validate() {
  const validateName: boolean = /^[A-Z][A-Za-z-][A-Za-z-]+$/.test(
    loginInput.value,
  );
  const validateSurname: boolean = /^[A-Z][A-Za-z-]{2}[A-Za-z-]+$/.test(
    passwordInput.value,
  );
  if (!/^[A-Z]/.test(loginInput.value)) {
    loginInput.style.borderColor = "red";
    error.innerText = "The first letter must be uppercase";
    loginInput.insertAdjacentElement("afterend", error);
  } else if (!/^[A-Za-z-]+$/.test(loginInput.value)) {
    loginInput.style.borderColor = "red";
    error.innerText = "The login must contain only English letters and '-'";
    loginInput.insertAdjacentElement("afterend", error);
  } else if (!/^[A-Za-z-]{2}[A-Za-z-]+$/.test(loginInput.value)) {
    loginInput.style.borderColor = "red";
    error.innerText = "The login must contain three or more characters";
    loginInput.insertAdjacentElement("afterend", error);
  } else if (validateName) {
    error.remove();
    loginInput.style.borderColor = "";
  }

  if (!/^[A-Z]/.test(passwordInput.value)) {
    passwordInput.style.borderColor = "red";
    errorPassword.innerText = "The first letter must be uppercase";
    passwordInput.insertAdjacentElement("afterend", errorPassword);
  } else if (!/^[A-Za-z-]+$/.test(passwordInput.value)) {
    passwordInput.style.borderColor = "red";
    errorPassword.innerText =
      "The password must contain only English letters and '-'";
    passwordInput.insertAdjacentElement("afterend", errorPassword);
  } else if (!/^[A-Za-z-]{3}[A-Za-z-]+$/.test(passwordInput.value)) {
    passwordInput.style.borderColor = "red";
    errorPassword.innerText =
      "The password must contain four or more characters";
    passwordInput.insertAdjacentElement("afterend", errorPassword);
  } else if (validateSurname) {
    errorPassword.remove();
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
