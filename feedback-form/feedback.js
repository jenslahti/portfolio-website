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
    console.log(
      "Form is valid! " +
        " Name: " +
        nameInput.value +
        " Email: " +
        emailInput.value +
        " Topic: " +
        topicInput.value +
        " Message: " +
        messageInput.value +
        " Website: " +
        websiteInput.value,
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

function validateTopic() {
  const topicValue = topicInput.value.trim();

  if (topicValue === "") {
    topicError.textContent = "Topic of interest is required.";
    return false;
  }

  topicError.textContent = "";
  return true;
}

function validateMessage() {
  const messageValue = messageInput.value.trim();

  if (messageValue === "") {
    messageError.textContent = "Message is required.";
    return false;
  }
  if (messageValue.length < MIN_MESSAGE_LENGTH) {
    messageError.textContent = "Message must be at least 15 characters long.";
    return false;
  }

  messageError.textContent = "";
  return true;
}

// TODO: add max message length as well.
function updateMessageCounter() {
  const messageLength = messageInput.value.trim().length;
  const remainingChars = MIN_MESSAGE_LENGTH - messageLength;

  if (messageLength < MIN_MESSAGE_LENGTH) {
    messageCounter.textContent =
      messageLength +
      " / " +
      MIN_MESSAGE_LENGTH +
      " characters - " +
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

function validateWebsite() {
  const websiteValue = websiteInput.value.trim();
  if (websiteValue === "") {
    websiteError.textContent = "";
    return true;
  }
  if (!websiteInput.checkValidity()) {
    websiteError.textContent =
      "Please enter a valid URL, including https:// (e.g. https://example.com).";
    return false;
  }
  websiteError.textContent = "";
  return true;
}
