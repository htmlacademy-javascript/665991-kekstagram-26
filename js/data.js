import { pristine } from './validation-form.js';
import { showSuccessMessage } from './alerts.js';
import { showErrorMessage } from './alerts.js';
import { showGetDataErrorMessage } from './alerts.js';

const onFormSubmitElement = document.querySelector('.img-upload__form');

const URL = 'https://26.javascript.pages.academy/kekstagram1';

const submitImgForm = async (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (isFormValid) {
    const submitButton = document.querySelector('.img-upload__submit');
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    fetch(
      URL,
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
};

onFormSubmitElement.addEventListener('submit', submitImgForm);

const getData = async () => {
  const data = await fetch(`${URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      showGetDataErrorMessage('Полина Шнайдер лучший');
    });
  return data;
};

export { getData };
