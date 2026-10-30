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

messageInput.addEventListener("input", updateMessageCounter);
updateMessageCounter();

form.addEventListener("submit", function (event) {
  event.preventDefault();

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
    const fullNameValue = nameInput.value.trim();
    form.reset();
    showSuccessMessage(fullNameValue);
  }
});

function showSuccessMessage(fullNameValue) {
  formSuccess.textContent = "Thanks for your feedback, " + fullNameValue + "!";

  setTimeout(() => {
    formSuccess.textContent = "";
  }, 4000);
}

form.addEventListener("reset", resetForm);

function resetForm() {
  resetFieldState(nameInput, nameError);
  resetFieldState(emailInput, emailError);
  resetFieldState(topicInput, topicError);
  resetFieldState(messageInput, messageError);
  resetFieldState(websiteInput, websiteError);

  formSuccess.textContent = "";
  setTimeout(updateMessageCounter, 0);
}

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
      "Message must be at least 15 characters long.",
    );
    return false;
  }

  clearFieldError(messageInput, messageError);
  return true;
}

function validateWebsite() {
  const websiteValue = websiteInput.value.trim();
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

function updateMessageCounter() {
  const messageLength = messageInput.value.trim().length;
  const remainingChars = MIN_MESSAGE_LENGTH - messageLength;

  if (messageLength === 0) {
    messageCounter.textContent =
      "0 / " +
      MIN_MESSAGE_LENGTH +
      " characters. Minimum 15 characters required.";
    messageCounter.classList.remove("not-ok");
    messageCounter.classList.remove("ok");
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
      messageLength + " characters. Minimum characters (15) reached.";
    messageCounter.classList.add("ok");
    messageCounter.classList.remove("not-ok");
  }
}

function showFieldError(input, errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  input.classList.add("invalid");
  input.classList.remove("valid");
  input.setAttribute("aria-invalid", "true");
}

function clearFieldError(input, errorElement) {
  errorElement.textContent = "";
  input.classList.remove("invalid");
  input.classList.add("valid");
  input.removeAttribute("aria-invalid");
}
