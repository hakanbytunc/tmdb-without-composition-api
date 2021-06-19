const ID_SELECTED_MOVIE = "core-id";

export const getID = () => {
  return window.localStorage.getItem(ID_SELECTED_MOVIE);
};

export const saveID = (movieID) => {
  window.localStorage.setItem(ID_SELECTED_MOVIE, movieID);
};

export const destroyID = () => {
  window.localStorage.removeItem(ID_SELECTED_MOVIE);
};

export default { getID, saveID, destroyID };