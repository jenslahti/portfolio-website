// DOM references selected once to avoid repeated DOM queries
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
const messageCounter = document.getElementById("message-counter");
const formSuccess = document.getElementById("form-success");
const MIN_MESSAGE_LENGTH = 15;

// Event listener for message character counter update
messageInput.addEventListener("input", updateMessageCounter);
updateMessageCounter();

// Event listeners for blur events to validate each input field
nameInput.addEventListener("blur", validateFullName);
emailInput.addEventListener("blur", validateEmail);
topicInput.addEventListener("blur", validateTopic);
messageInput.addEventListener("blur", validateMessage);
websiteInput.addEventListener("blur", validateWebsite);

// Event listener for form reset to clear error messages and reset field states
form.addEventListener("reset", resetForm);

// Event listener for form submission to validate all fields and show success message
form.addEventListener("submit", function (event) {
  // Stop the page from reloading
  event.preventDefault();

  // Validate all fields and store the results
  const isNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isTopicValid = validateTopic();
  const isMessageValid = validateMessage();
  const isWebsiteValid = validateWebsite();

  if (
    isNameValid &&
    isEmailValid &&
    isTopicValid &&
    isMessageValid &&
    isWebsiteValid
  ) {
    // Save name before reset for feedback message
    const fullNameValue = nameInput.value.trim();
    // Triggers resetForm function to clear all fields and error messages
    form.reset();
    showSuccessMessage(fullNameValue);
  }
});

// Function to show a success message after successful form submission, clearing after 4 seconds per assignment requirements
function showSuccessMessage(fullNameValue) {
  formSuccess.textContent = "Thanks for your feedback, " + fullNameValue + "!";

  setTimeout(() => {
    formSuccess.textContent = "";
  }, 4000);
}

// Function to reset the form, clearing all error messages and resetting field states
function resetForm() {
  resetFieldState(nameInput, nameError);
  resetFieldState(emailInput, emailError);
  resetFieldState(topicInput, topicError);
  resetFieldState(messageInput, messageError);
  resetFieldState(websiteInput, websiteError);

  formSuccess.textContent = "";
  // Use setTimeout for the message counter to be updated after the form reset
  setTimeout(updateMessageCounter, 0);
}

// Function to reset the state of a specific input field
function resetFieldState(input, errorElement) {
  errorElement.textContent = "";
  input.classList.remove("valid", "invalid");
  input.removeAttribute("aria-invalid");
}

function validateFullName() {
  const fullNameValue = nameInput.value.trim();
  if (fullNameValue === "") {
    showFieldError(nameInput, nameError, "Full name is required.");
    return false;
  }
  if (fullNameValue.length < 2) {
    showFieldError(
      nameInput,
      nameError,
      "Full name must be at least 2 characters long.",
    );
    return false;
  }
  const nameRegex = /^[\p{L}\s'-]+$/u;
  if (!nameRegex.test(fullNameValue)) {
    showFieldError(
      nameInput,
      nameError,
      "Full name can only contain international letters, spaces, apostrophes (') and hyphens (-).",
    );
    return false;
  }
  clearFieldError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showFieldError(emailInput, emailError, "Email is required.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    showFieldError(
      emailInput,
      emailError,
      "Please enter a valid email address including the '@' symbol and a domain.",
    );
    return false;
  }

  clearFieldError(emailInput, emailError);
  return true;
}

function validateTopic() {
  const topicValue = topicInput.value.trim();

  if (topicValue === "") {
    showFieldError(topicInput, topicError, "Topic of interest is required.");
    return false;
  }

  clearFieldError(topicInput, topicError);
  return true;
}

function validateMessage() {
  const messageValue = messageInput.value.trim();

  if (messageValue === "") {
    showFieldError(messageInput, messageError, "Message is required.");
    return false;
  }
  if (messageValue.length < MIN_MESSAGE_LENGTH) {
    showFieldError(
      messageInput,
      messageError,
      "Message must be at least " + MIN_MESSAGE_LENGTH + " characters long.",
    );
    return false;
  }

  clearFieldError(messageInput, messageError);
  return true;
}

function validateWebsite() {
  const websiteValue = websiteInput.value.trim();
  // Website field is optional making empty field valid
  if (websiteValue === "") {
    resetFieldState(websiteInput, websiteError);
    return true;
  }
  if (!websiteInput.checkValidity()) {
    showFieldError(
      websiteInput,
      websiteError,
      "Please enter a valid URL, including https:// (e.g. https://example.com).",
    );
    return false;
  }
  clearFieldError(websiteInput, websiteError);
  return true;
}

// Function to update the message character counter based on the current input length
function updateMessageCounter() {
  const messageLength = messageInput.value.trim().length;
  const remainingChars = MIN_MESSAGE_LENGTH - messageLength;

  if (messageLength === 0) {
    messageCounter.textContent =
      "0 / " +
      MIN_MESSAGE_LENGTH +
      " characters. Minimum " +
      MIN_MESSAGE_LENGTH +
      " characters required.";
    messageCounter.classList.remove("not-ok", "ok");
  } else if (messageLength < MIN_MESSAGE_LENGTH) {
    messageCounter.textContent =
      messageLength +
      " / " +
      MIN_MESSAGE_LENGTH +
      " minimum characters - " +
      remainingChars +
      " more needed.";
    messageCounter.classList.add("not-ok");
    messageCounter.classList.remove("ok");
  } else {
    messageCounter.textContent =
      messageLength +
      " characters. Minimum characters (" +
      MIN_MESSAGE_LENGTH +
      ") reached.";
    messageCounter.classList.add("ok");
    messageCounter.classList.remove("not-ok");
  }
}

// Function to show an error message for a specific input field, adding class invalid
function showFieldError(input, errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  input.classList.add("invalid");
  input.classList.remove("valid");
  input.setAttribute("aria-invalid", "true");
}

// Function to clear the error message for a specific input field, adding class valid
function clearFieldError(input, errorElement) {
  errorElement.textContent = "";
  input.classList.remove("invalid");
  input.classList.add("valid");
  input.removeAttribute("aria-invalid");
}
