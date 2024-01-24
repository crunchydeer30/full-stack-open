const KEY = 'loggedUser';

const saveUser = (user) => {
  localStorage.setItem(KEY, user);
};

const loadUser = () => {
  return window.localStorage.getItem(KEY);
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

export default {
  saveUser,
  loadUser,
  removeUser,
};
