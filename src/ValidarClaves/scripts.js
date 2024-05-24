function validatePassword() {
  const password = document.getElementById("password").value;
  const progressBar = document.getElementById("passwordProgressBar");
  const passwordHelp = document.getElementById("passwordHelp");
  const submitButton = document.getElementById("submitButton");
  let progress = 0;
  let messages = [];

  if (password.length >= 6) {
    progress += 33;
  } else {
    messages.push("La contraseña debe tener al menos 6 caracteres.");
  }

  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharPattern.test(password)) {
    progress += 33;
  } else {
    messages.push(
      "La contraseña debe contener al menos un carácter especial, por ejemplo: !, @, #, $."
    );
  }

  const uppercasePattern = /[A-Z]/;
  if (uppercasePattern.test(password)) {
    progress += 34;
  } else {
    messages.push(
      "La contraseña debe contener al menos una letra mayúscula, por ejemplo: A, B, C."
    );
  }

  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", progress);

  if (progress < 34) {
    progressBar.classList.remove("bg-warning", "bg-success");
    progressBar.classList.add("bg-danger");
  } else if (progress < 67) {
    progressBar.classList.remove("bg-danger", "bg-success");
    progressBar.classList.add("bg-warning");
  } else {
    progressBar.classList.remove("bg-danger", "bg-warning");
    progressBar.classList.add("bg-success");
  }

  passwordHelp.innerHTML = "";
  if (messages.length > 0) {
    messages.forEach(function (message) {
      const li = document.createElement("li");
      li.textContent = message;
      passwordHelp.appendChild(li);
    });
    submitButton.disabled = true;
  } else {
    const li = document.createElement("li");
    li.textContent = "La contraseña cumple con todos los requisitos.";
    li.classList.add("valid");
    passwordHelp.appendChild(li);
    submitButton.disabled = false;
  }

  Array.from(passwordHelp.children).forEach((li) => {
    if (!li.textContent.includes("debe")) {
      li.classList.add("valid");
    }
  });
}

document
  .getElementById("togglePassword")
  .addEventListener("mousedown", function () {
    const passwordInput = document.getElementById("password");
    passwordInput.type = "text";
    this.querySelector("i").classList.remove("fa-eye-slash");
    this.querySelector("i").classList.add("fa-eye");
  });

document
  .getElementById("togglePassword")
  .addEventListener("mouseup", function () {
    const passwordInput = document.getElementById("password");
    passwordInput.type = "password";
    this.querySelector("i").classList.remove("fa-eye");
    this.querySelector("i").classList.add("fa-eye-slash");
  });

document
  .getElementById("togglePassword")
  .addEventListener("mouseout", function () {
    const passwordInput = document.getElementById("password");
    passwordInput.type = "password";
    this.querySelector("i").classList.remove("fa-eye");
    this.querySelector("i").classList.add("fa-eye-slash");
  });
