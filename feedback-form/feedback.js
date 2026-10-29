const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("feedback-topic");
const messageInput = document.getElementById("message");
const websiteInput = document.getElementById("website");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const topicError = document.getElementById("topic-error");
const messageError = document.getElementById("message-error");
const websiteError = document.getElementById("website-error");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateFullName();
  const isEmailValid = validateEmail();

  if (isNameValid && isEmailValid) {
    console.log(
      "Form is valid! " +
        " Name: " +
        nameInput.value +
        " Email: " +
        emailInput.value,
    );
  }
});

function validateFullName() {
  const fullNameValue = nameInput.value.trim();
  if (fullNameValue === "") {
    nameError.textContent = "Full name is required.";
    return false;
  }
  if (fullNameValue.length < 2) {
    nameError.textContent = "Full name must be at least 2 characters long.";
    return false;
  }
  const nameRegex = /^[\p{L}\s'-]+$/u;
  if (!nameRegex.test(fullNameValue)) {
    nameError.textContent =
      "Full name can only contain international letters, spaces, apostrophes (') and hyphens (-).";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailError.textContent = "Email is required.";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    emailError.textContent =
      "Please enter a valid email address including the '@' symbol and a domain.";
    return false;
  }

  emailError.textContent = "";
  return true;
}
