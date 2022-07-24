const uploadImgInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImgContainer = document.querySelector('.img-upload__preview img');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imageScaleValue = document.querySelector('.scale__control--value');
const body = document.body;

const DEFAULT_IMAGE_SCALE = 100;

uploadImgInput.addEventListener('change', fileUploadChange);
closeButton.addEventListener('click', fullClose);

function fileUploadChange() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  previewImgContainer.src = URL.createObjectURL(uploadImgInput.files[0]);
  document.getElementById('effect-none').checked = true;
  imageScaleValue.value = `${DEFAULT_IMAGE_SCALE}%`;
  document.addEventListener('keydown', escCloseImgPrev);
}

function fullClose() {
  closeImgPrev();
  clearHashtagsAndComments();
}

function closeImgPrev() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadImgInput.value = '';
  previewImgContainer.classList = '';
  previewImgContainer.style.filter = null;
  previewImgContainer.style.transform = null;
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  imageScaleValue.value = `${DEFAULT_IMAGE_SCALE}%`;
}

function clearHashtagsAndComments() {
  hashtagInput.value = '';
  commentInput.value = '';
}

function escCloseImgPrev(evt) {
  if (hashtagInput === document.activeElement) {
    evt.stopPropagation();
  } else if (commentInput === document.activeElement) {
    evt.stopPropagation();
  } else if (evt.key === 'Escape') {
    fullClose();
    document.removeEventListener('keydown', escCloseImgPrev);
    document.location.reload();
  }
}

export { closeImgPrev };
