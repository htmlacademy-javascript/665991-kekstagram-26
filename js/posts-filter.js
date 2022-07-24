import { createUsersPosts } from './social-images.js';

const filterSection = document.querySelector('.img-filters');
const filterForm = filterSection.querySelector('.img-filters__form');
const filterButton = filterSection.querySelectorAll('.img-filters__button');

function initPostsFilter(userPosts){
  filterForm.addEventListener('click', (evt) => {
    changePostsFilter(evt, userPosts);});
  showFilterSection();
  enableFilter();
}

const debounce = (callback, delay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => callback.apply(this, rest), delay
    );
  };
};

function changePostsFilter(evt, userPosts) {
  const filter = evt.target.id;
  deletePosts();
  switch (filter) {
    case 'filter-discussed':
      debounce(() => {
        changeFilter(filter);
        createUsersPosts(filterDiscuss(userPosts));
      }, 500)();
      break;
    case 'filter-random':
      debounce(() => {
        changeFilter(filter);
        createUsersPosts(filterRandom(userPosts, 10));
      }, 500)();
      break;
    case 'filter-default':
      debounce(() => {
        changeFilter(filter);
        createUsersPosts(userPosts);
      }, 500)();
      break;
  }
}

function deletePosts() {
  const posts = document.querySelector('.pictures').querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
}

function filterRandom(userPosts) {
  const shuffledUserPosts = shuffle(userPosts);
  return shuffledUserPosts.slice(0, 10);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function filterDiscuss(userPosts) {
  return userPosts.slice().sort((post1, post2) => post2.comments.length - post1.comments.length);
}

function changeFilter (filterName) {
  document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
}

function showFilterSection() {
  filterSection.classList.remove('img-filters--inactive');
  filterSection.classList.add('img-filters--active');
}

function enableFilter() {
  filterButton.forEach((button) => {
    button.disabled = false;
  });
}

function disableFilter() {
  filterButton.forEach((button) => {
    button.disabled = true;
  });
}

export { initPostsFilter, disableFilter};
