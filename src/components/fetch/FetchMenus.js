import { getFetchingOption, API_URL } from './options';

const fetchMenus = (token) => {
  const options = getFetchingOption(token);

  return fetch(`${API_URL}/menus`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchMenus;
