import { createUsersPosts } from './social-images.js';
import { shuffle } from './utils.js';

const filterElement = document.querySelector('.img-filters');
const onFilterFormClick = filterElement.querySelector('.img-filters__form');
const filterButton = filterElement.querySelectorAll('.img-filters__button');

const debounce = (callback, delay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => callback.apply(this, rest), delay
    );
  };
};

const showFilterSection = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.classList.add('img-filters--active');
};

const deletePosts = () => {
  const posts = document.querySelector('.pictures').querySelectorAll('.picture');
  posts.forEach((post) => {
    post.remove();
  });
};

const changeFilter = (filterName) => {
  document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
};

const filterRandom = (userPosts) => {
  const shuffledUserPosts = shuffle(userPosts);
  return shuffledUserPosts.slice(0, 10);
};

const filterDiscuss = (userPosts) => userPosts.slice().sort((post1, post2) => post2.comments.length - post1.comments.length);

const changePostsFilter = (evt, userPosts) => {
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
};

const enableFilter = () => {
  filterButton.forEach((button) => {
    button.disabled = false;
  });
};

const initPostsFilter = (userPosts) => {
  onFilterFormClick.addEventListener('click', (evt) => {
    changePostsFilter(evt, userPosts);});
  showFilterSection();
  enableFilter();
};

const disableFilter = () => {
  filterButton.forEach((button) => {
    button.disabled = true;
  });
};

export { initPostsFilter, disableFilter};
