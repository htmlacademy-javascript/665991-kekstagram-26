import { getData } from './data.js';
import { initPostsFilter } from './posts-filter.js';
import { disableFilter } from './posts-filter.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const userComment = bigPicture.querySelector('.social__comment');
const socialCommentsCurrent= bigPicture.querySelector('.comments-current');
const loadMoreCommentsButton = document.querySelector('.social__comments-loader');
const body = document.body;

window.addEventListener('load', getDataFromServer);

function getDataFromServer() {
  getData().then((data) => {
    disableFilter();
    createUsersPosts(data);
    initPostsFilter(data);
  });
}

function createUsersPosts(data) {
  for (const pic of data) {
    const randomUserPic = document.querySelector('#picture').content.querySelector('.picture');
    const clonUserPic = randomUserPic.cloneNode(true);
    clonUserPic.querySelector('.picture__img').src= pic.url;
    document.querySelector('.pictures').append(clonUserPic);
    clonUserPic.querySelector('.picture__comments').textContent = pic.comments.length;
    clonUserPic.querySelector('.picture__likes').textContent = pic.likes;
    clonUserPic.addEventListener('click', () => {
      openBigPictureMode(pic);
    });
  }
}

let comments = [];

function openBigPictureMode(pic) {
  const bigPictureSocial = document.querySelector('.big-picture__social');
  const socialCommentCount = document.querySelector('.social__comment-count');
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pic.url;
  bigPictureSocial.querySelector('.likes-count').textContent = pic.likes;
  socialCommentCount.querySelector('.comments-count').textContent = pic.comments.length;
  bigPictureSocial.querySelector('.social__caption').textContent = pic.description;
  document.addEventListener('keydown', escCloseBigPicture);
  socialCommentsContainer.innerHTML = '';
  comments = [...pic.comments];
  loadComments();
}

loadMoreCommentsButton.addEventListener('click', () => loadComments());

function loadComments() {
  loadMoreCommentsButton.classList.remove('hidden');
  const partComments = comments.splice(0, 5);
  renderComments(partComments);
  socialCommentsCurrent.textContent = document.querySelectorAll('.social__comment').length;
  if (!comments.length) {
    loadMoreCommentsButton.classList.add('hidden');
  }
}

function renderComments(partComments) {
  if (!partComments.length) {
    return;
  }
  const commentFragment = document.createDocumentFragment();

  partComments.forEach((comment) => {
    const commentItem = userComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentItem.querySelector('.social__picture').alt = comment.name;

    commentFragment.append(commentItem);
  });

  socialCommentsContainer.append(commentFragment);
}

const bigPictureCancelButton = document.querySelector('.big-picture__cancel');
bigPictureCancelButton.addEventListener('click', closeBigPicture);

function closeBigPicture () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}
function escCloseBigPicture(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
    document.removeEventListener('keydown', escCloseBigPicture);
  }
}

export { createUsersPosts };
