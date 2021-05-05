import getFetchingOption from './options';

const fetchMenus = (token) => {
  const options = getFetchingOption(token);

  return fetch('http://192.168.1.18/3proj_api/public/api/menus', options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchMenus;
