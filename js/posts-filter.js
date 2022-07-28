import { createUsersPosts } from './social-images.js';
import { shuffle } from './utils.js';
import { debounce } from './utils.js';

const filterElement = document.querySelector('.img-filters');
const onFilterFormClick = filterElement.querySelector('.img-filters__form');
const filterButton = filterElement.querySelectorAll('.img-filters__button');

const MAX_NUMBER_OF_RANDOM_POSTS = 10;
const DEBOUNCE_DELAY = 500;

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

const filterRandom = (userPosts) => shuffle(userPosts).slice(0, MAX_NUMBER_OF_RANDOM_POSTS);

const filterDiscuss = (userPosts) => userPosts.slice().sort((post1, post2) => post2.comments.length - post1.comments.length);

const changePostsFilter = (evt, userPosts) => {
  const filter = evt.target.id;
  deletePosts();
  switch (filter) {
    case 'filter-discussed':
      debounce(() => {
        changeFilter(filter);
        createUsersPosts(filterDiscuss(userPosts));
      }, DEBOUNCE_DELAY)();
      break;
    case 'filter-random':
      debounce(() => {
        changeFilter(filter);
        createUsersPosts(filterRandom(userPosts, MAX_NUMBER_OF_RANDOM_POSTS));
      }, DEBOUNCE_DELAY)();
      break;
    case 'filter-default':
      debounce(() => {
        changeFilter(filter);
        createUsersPosts(userPosts);
      }, DEBOUNCE_DELAY)();
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
