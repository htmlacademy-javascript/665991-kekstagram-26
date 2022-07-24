const smallButton = document.querySelector('.scale__control--smaller');
const bigButton = document.querySelector('.scale__control--bigger');
const radioButtons = document.querySelectorAll('.effects__radio');
const imageScaleInput = document.querySelector('.scale__control--value');
const prevImgContainer = document.querySelector('.img-upload__preview');
const effectValueField = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const SCALE_STEP = 25;
const MAX_IMAGE_SCALE = 100;

smallButton.addEventListener('click', decreaseScale);
bigButton.addEventListener('click', increaseScale);
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', changeEffects);
}

function decreaseScale () {
  let imgScl = imageScaleInput.value.replace('%', '');
  if (imgScl > SCALE_STEP) {
    imgScl -= SCALE_STEP;
    imageScaleInput.value = `${imgScl}%`;
    imageScaleTransformation(imgScl);
  }
}

function increaseScale () {
  const imgScl = imageScaleInput.value.replace('%', '');
  if (imgScl < MAX_IMAGE_SCALE) {
    let numScl = parseInt(imgScl, 10);
    numScl += SCALE_STEP;
    imageScaleInput.value = `${numScl  }%`;
    imageScaleTransformation(numScl);
  }
}

function imageScaleTransformation(numericScale) {
  prevImgContainer.querySelector('img').style.transform = `scale(${numericScale * 0.01})`;
}

function changeEffects (event) {
  prevImgContainer.querySelector('img').classList = '';
  prevImgContainer.querySelector('img').classList.add(`effects__preview--${event.target.value}`);
  changeSliderScale(event.target.value);
}

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
});

function changeSliderScale(effectName) {
  switch(effectName) {
    case 'chrome':
      effectValueField.classList.remove('hidden');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'sepia':
      effectValueField.classList.remove('hidden');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'marvin':
      effectValueField.classList.remove('hidden');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      break;
    case 'phobos':
      effectValueField.classList.remove('hidden');
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'heat':
      effectValueField.classList.remove('hidden');
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'none':
      prevImgContainer.querySelector('img').style.filter = null;
      effectValueField.classList.add('hidden');
      break;
  }
}

slider.noUiSlider.on('update', () => {
  const levelSlider = slider.noUiSlider.get();
  const effectClass = prevImgContainer.querySelector('img').classList.value;
  if (effectClass === 'effects__preview--chrome') {
    prevImgContainer.querySelector('img').style.filter = `grayscale(${levelSlider})`;
  }
  else if (effectClass === 'effects__preview--sepia') {
    prevImgContainer.querySelector('img').style.filter = `sepia(${levelSlider})`;
  }
  else if (effectClass === 'effects__preview--marvin') {
    prevImgContainer.querySelector('img').style.filter = `invert(${levelSlider}%)`;
  }
  else if (effectClass === 'effects__preview--phobos') {
    prevImgContainer.querySelector('img').style.filter = `blur(${levelSlider}px)`;
  }
  else if (effectClass === 'effects__preview--heat') {
    prevImgContainer.querySelector('img').style.filter = `brightness(${levelSlider})`;
  }
  effectLevelValue.value = levelSlider;
});
