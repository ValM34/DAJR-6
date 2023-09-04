function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  const body = document.querySelector('body');
  body.style.overflowY = 'hidden';
  // Focus first input
  const firstInput = document.querySelector('#contact_form input');
  console.log(firstInput);
  firstInput.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const body = document.querySelector('body');
  body.style.overflowY = 'auto';
}

const modal = document.getElementById("contact_form");
// DOM Elements (inputs)
const firstname = document.querySelector("#firstName");
const lastname = document.querySelector("#lastName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

modal.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
});

// verify if form entries are valid
function validateForm() {
  // Instanciate Form
  const form = new Form(
    firstname.value,
    lastname.value,
    email.value,
    message.value,
  );

  form.isValid();

  // Handle error messages
  for (const [key, value] of Object.entries(form.form)) {
    // Containers id must named like this : '#[variable]_container'
    container = document.querySelector(`#${form.form[key].name}_container`);
    if (form.form[key].isValid === false) {
      container.setAttribute("data-error", form.form[key].errorMessage);
      container.setAttribute("data-error-visible", "true");
    } else {
      container.setAttribute("data-error-visible", "false");
    }
  }

  if(form.isValid()) {
    console.log(form);
  }

  // If form is valid return true
  return form.isValid();
}
