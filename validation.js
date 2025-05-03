function validate() {
  var valid = true;

  document.querySelectorAll(".error").forEach(function (error) {
    error.textContent = "";
  });

  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var pw = document.getElementById("password").value;
  var confirmPw = document.getElementById("confirm").value;

  if (!validName(firstName)) {
    valid = false;
    displayError("fnameErr", "Please enter a valid first name");
  }

  if (!validName(lastName)) {
    valid = false;
    displayError("lnameErr", "Please enter a valid last name");
  }

  if (!validEmail(email)) {
    valid = false;
    displayError("emailErr", "Please enter a valid email address");
  }

  if (!validUsername(username)) {
    valid = false;
    displayError("usernameErr", "Please enter a valid username");
  }

  if (!validPassword(pw)) {
    valid = false;
    displayError(
      "passwordErr",
      "Please enter a valid password (At least 8 characters)"
    );
  } else if (pw !== confirmPw) {
    valid = false;
    displayError("confirmErr", "Passwords do not match");
  }

  return valid;
}

function validName(name) {
  return /^[a-zA-Z]+$/.test(name);
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validUsername(username) {
  return /^[a-zA-Z0-9_]+$/.test(username);
}

function validPassword(pw) {
  return pw.length >= 8;
}

function displayError(elementId, errorMessage) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = errorMessage;
}
