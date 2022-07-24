import { closeImgPrev } from './image-upload.js';

const body = document.body;

const showSuccessMessage = () => {
  closeImgPrev();
  const popupSection = document.querySelector('#success').content.querySelector('.success');
  const popup = popupSection.cloneNode(true);
  body.append(popup);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessAlert);

  function closeSuccessAlert() {
    popup.remove();
  }

  document.addEventListener('keydown', escCloseSuccessAlert);

  function escCloseSuccessAlert(evt) {
    if (evt.key === 'Escape') {
      popup.remove();
      document.removeEventListener('keydown', escCloseSuccessAlert);
    }
  }
};

function showErrorMessage() {
  closeImgPrev();
  const errorSection = document.querySelector('#error').content.querySelector('.error');
  const errorPopup = errorSection.cloneNode(true);
  body.append(errorPopup);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorAlert);

  function closeErrorAlert() {
    errorPopup.remove();
  }

  document.addEventListener('keydown', escCloseErrorAlert);

  function escCloseErrorAlert(evt) {
    if (evt.key === 'Escape') {
      errorPopup.remove();
      document.removeEventListener('keydown', escCloseErrorAlert);
    }
  }

  errorPopup.addEventListener('click', (e) => {
    const errorInner = document.querySelector('.error__inner');
    const isOutsideClick = !e.composedPath().includes(errorInner);
    if (isOutsideClick) {
      closeImgPrev();
      errorPopup.remove();
    }
  });
}

export { showSuccessMessage, showErrorMessage };
