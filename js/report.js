document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".landscape-form");
  const submitBtn = document.querySelector(".submit-btn");

  const bugType = document.getElementById("bug-type");
  const anotherCategory = document
    .querySelector("#bug-type")
    .closest(".form-group")
    .querySelector(".another-category");

  bugType.addEventListener("change", function () {
    if (this.value === "another") {
      anotherCategory.style.display = "block";
    } else {
      anotherCategory.style.display = "none";
      const anotherDesc = document.getElementById("another-desc");
      anotherDesc.value = "";
      hideError(anotherDesc);
    }
  });

  const modal = document.getElementById("successModal");
  const modalCloseBtn = document.querySelector(".modal-close-btn");

  function showModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function hideModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  modalCloseBtn.addEventListener("click", hideModal);
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      hideModal();
    }
  });

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isServerValid = validateServer();
    const isBugTypeValid = validateBugType();
    let isAnotherDescValid = true;

    if (bugType.value === "another") {
      isAnotherDescValid = validateAnotherDesc();
    }

    const isDescriptionValid = validateDescription();
    const isCheckboxValid = validateCheckbox();

    if (
      isUsernameValid &&
      isEmailValid &&
      isServerValid &&
      isBugTypeValid &&
      isAnotherDescValid &&
      isDescriptionValid &&
      isCheckboxValid
    ) {
      showModal();
      form.reset();
      anotherCategory.style.display = "none";

      const inputs = form.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        hideError(input);
        input.style.borderColor = "";
        if (input.type === "checkbox") {
          input.checked = false;
        }
      });
    }
  });

  document
    .getElementById("username")
    .addEventListener("input", validateUsername);
  document.getElementById("email").addEventListener("input", validateEmail);
  document.getElementById("server").addEventListener("change", validateServer);
  document
    .getElementById("bug-type")
    .addEventListener("change", validateBugType);
  document
    .getElementById("another-desc")
    .addEventListener("input", validateAnotherDesc);
  document
    .getElementById("description")
    .addEventListener("input", validateDescription);
  document
    .getElementById("checkbox")
    .addEventListener("change", validateCheckbox);

  // Validation functions (tidak diubah)
  function validateUsername() {
    const username = document.getElementById("username");
    const usernameValue = username.value.trim();
    if (!usernameValue) {
      showError(username, "Username cannot be empty!");
      return false;
    } else if (usernameValue.length < 3 || usernameValue.length > 20) {
      showError(username, "Username must be between 3-20 characters!");
      return false;
    } else {
      hideError(username);
      return true;
    }
  }

  function validateEmail() {
    const email = document.getElementById("email");
    const emailValue = email.value.trim();
    if (!emailValue) {
      showError(email, "Email cannot be empty!");
      return false;
    } else if (!isValidEmail(emailValue)) {
      showError(email, "The email address is not valid!");
      return false;
    } else {
      hideError(email);
      return true;
    }
  }

  function validateServer() {
    const server = document.getElementById("server");
    if (!server.value) {
      showError(server, "Server region selection is required!");
      return false;
    } else {
      hideError(server);
      return true;
    }
  }

  function validateBugType() {
    const bugType = document.getElementById("bug-type");
    if (!bugType.value) {
      showError(bugType, "Bug category selection is required!");
      return false;
    } else {
      hideError(bugType);
      return true;
    }
  }

  function validateAnotherDesc() {
    const anotherDesc = document.getElementById("another-desc");
    if (bugType.value === "another" && !anotherDesc.value.trim()) {
      showError(anotherDesc, "Please specify your category!");
      return false;
    } else {
      hideError(anotherDesc);
      return true;
    }
  }

  function validateDescription() {
    const description = document.getElementById("description");
    const descValue = description.value.trim();
    if (!descValue) {
      showError(description, "Bug description cannot be empty!");
      return false;
    } else if (descValue.length < 20 || descValue.length > 500) {
      showError(
        description,
        "Please enter a bug description with a 20 - 500 characters."
      );
      return false;
    } else {
      hideError(description);
      return true;
    }
  }

  function validateCheckbox() {
    const checkbox = document.getElementById("checkbox");
    if (!checkbox.checked) {
      showError(checkbox);
      return false;
    } else {
      hideError(checkbox);
      return true;
    }
  }

  function showError(input, message) {
    let errorMsg;

    if (input.type === "checkbox") {
      errorMsg = input.closest(".checkbox-group").querySelector(".error-msg");
      input.style.outline = "2px solid #ff6b6b";
    } else if (input.id === "bug-type") {
      errorMsg = input
        .closest(".form-group")
        .querySelector(".error-msg:last-child");
    } else {
      errorMsg = input.nextElementSibling;
    }

    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    if (input.type !== "checkbox") {
      input.style.borderColor = "#ff6b6b";
    }
  }

  function hideError(input) {
    let errorMsg;

    if (input.type === "checkbox") {
      errorMsg = input.closest(".checkbox-group").querySelector(".error-msg");
      input.style.outline = "";
    } else if (input.id === "bug-type") {
      errorMsg = input
        .closest(".form-group")
        .querySelector(".error-msg:last-child");
    } else {
      errorMsg = input.nextElementSibling;
    }

    errorMsg.style.display = "none";
    errorMsg.textContent = "";
    if (input.type !== "checkbox") {
      input.style.borderColor = "";
    }
  }

  function isValidEmail(email) {
    const re =
      /^[^\s@]+@(gmail.com|yahoo.com|outlook.com|hotmail.com|icloud.com|ac.id|co.id|yahoo.co.id|mail.ru|yandex.ru|protonmail.com|zoho.com)$/i;
    return re.test(email);
  }
});
