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

  if (isNameValid) {
    console.log("Form is valid! " + " Name:", nameInput.value);
  }
});

function validateFullName() {
  const fullNameValue = nameInput.value.trim();
  if (fullNameValue === "") {
    nameError.textContent = "Name is required.";
    return false;
  }
  if (fullNameValue.length < 2) {
    nameError.textContent = "Name must be at least 2 characters long.";
    return false;
  }
  const nameRegex = /^[\p{L}\s'-]+$/u;
  if (!nameRegex.test(fullNameValue)) {
    nameError.textContent =
      "Name can only contain international letters, spaces, apostrophes (') and hyphens (-).";
    return false;
  }
  nameError.textContent = "";
  return true;
}
