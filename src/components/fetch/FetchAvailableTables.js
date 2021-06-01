import { getFetchingOption, API_URL } from './options';

const fetchAvailableTables = (token) => {
  const options = getFetchingOption(token);

  return fetch(`${API_URL}/available_tables`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchAvailableTables;
