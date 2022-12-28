export const fetchImages = (searchValue, page, perPage) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=32379374-a9b345354aebc47310028ca20&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error('Ой, что-то пошло не так :('));
  });
};
