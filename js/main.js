let uploadOverlay = document.querySelector('.img-upload__overlay');
let body = document.body;
let closeButton = document.querySelector('.img-upload__cancel');
let uploadImgInput = document.querySelector('.img-upload__input');

uploadImgInput.addEventListener("change", fileUploadChange);

function fileUploadChange() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  let prevImgContainer = document.querySelector('.img-upload__preview');
  prevImgContainer.querySelector('img').src = uploadImgInput.files[0].name;
  console.log("ggggg");
}

closeButton.addEventListener("click", closeImgPrev);

function closeImgPrev() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
}

document.addEventListener("keydown", escCloseImgPrev);

function escCloseImgPrev(evt) {
  if (evt.key === "Escape") {
    closeImgPrev();
    evt.preventDefault();
  }
}


