import { pristine } from './validation-form.js';
import { showSuccessMessage } from './alerts.js';
import { showErrorMessage } from './alerts.js';

const submitForm = document.querySelector('.img-upload__form');

submitForm.addEventListener('submit', submitImgForm);

async function submitImgForm(evt) {
  evt.preventDefault();

  const valid = pristine.validate();
  if (valid) {
    const submitButton = document.querySelector('.img-upload__submit');
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        type: 'multipart/form-data',
        body: formData
      }).then((response) => {
      if (response.ok) {
        submitButton.disabled = false;
        showSuccessMessage();
      } else {
        submitButton.disabled = false;
        showErrorMessage();
      }
    }).catch(() => {
      showErrorMessage();
    });
  }
}

async function getData() {
  const data = await fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json());
  return data;
}

export { getData };
