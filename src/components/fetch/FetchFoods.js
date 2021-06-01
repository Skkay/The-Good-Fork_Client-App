import { getFetchingOption, API_URL } from './options';

const fetchFoods = (token) => {
  const options = getFetchingOption(token);

  return fetch(`${API_URL}/foods`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchFoods;
