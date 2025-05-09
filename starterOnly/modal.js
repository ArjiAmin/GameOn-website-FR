function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal on “x”
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => modalbg.style.display = "none");

// catch submit
const reserveForm = document.querySelector("form[name='reserve']");
reserveForm.addEventListener("submit", validate);

// Display error
function showError(element, message) {
  const fd = element.closest(".formData");
  fd.setAttribute("data-error", message);
  fd.setAttribute("data-error-visible", "true");
}

// Check if form fields are valid by using regex found online
function validate(e) {
  e.preventDefault();
  let isValid = true;

  const formData = {
    firstName: document.getElementById("first").value,
    lastName: document.getElementById("last").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: [...document.querySelectorAll("input[name='location']")].find(r => r.checked)?.value || 'none selected',
    acceptedTerms: document.getElementById("checkbox1").checked
  };

  console.log('Form Data:', formData);

  // reset all
  document.querySelectorAll(".formData").forEach(fd => {
    fd.removeAttribute("data-error");
    fd.removeAttribute("data-error-visible");
  });

  // first name
  const first = document.getElementById("first");
  if (first.value.trim().length < 2) {
    showError(first, "Veuillez entrer 2 caractères ou plus pour le prénom.");
    isValid = false;
  }

  // last name
  const last = document.getElementById("last");
  if (last.value.trim().length < 2) {
    showError(last, "Veuillez entrer 2 caractères ou plus pour le nom.");
    isValid = false;
  }

  // email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }

  // birthdate, no need to specify if more or less than 18
  const birth = document.getElementById("birthdate");
  if (!birth.value) {
    showError(birth, "Vous devez entrer votre date de naissance.");
    isValid = false;
  }

  // quantity
  const qty = document.getElementById("quantity");
  if (qty.value === "" || isNaN(qty.value)) {
    showError(qty, "Veuillez entrer un nombre valide.");
    isValid = false;
  }

  // radio input validator
  const radios = document.querySelectorAll("input[name='location']");
  if (![...radios].some(r => r.checked)) {
    const fdRadios = radios[0].closest(".formData");
    fdRadios.setAttribute("data-error", "Vous devez choisir une option.");
    fdRadios.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // TOS (CGU)
  const cgu = document.getElementById("checkbox1");
  if (!cgu.checked) {
    const fdCgu = cgu.closest(".formData");
    fdCgu.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
    fdCgu.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (isValid) {
    // Fetching the form's element
    const form = document.querySelector("form[name='reserve']");
    const formDataObj = new FormData(form);
    const formEntries = {};
    formDataObj.forEach((value, key) => formEntries[key] = value);

    // Add checkbox values because they don't appear in the FormData when unchecked.
    formEntries.notification = document.getElementById("checkbox2").checked;
    formEntries.acceptedTerms = document.getElementById("checkbox1").checked;

    console.log('Valid Form Data:', formEntries);

    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `
      <div class="success-msg">
        <p>Merci pour</p>
        <p>votre inscription</p>
      </div>
      <button class="btn-submit close-btn">Fermer</button>
    `;

    // Add event listener to the close button
    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", function () {
      modalbg.style.display = "none";
    });
  }
}
